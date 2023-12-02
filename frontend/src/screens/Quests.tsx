import { Typography, Paper, Button, Box, IconButton, Stack, css } from '@mui/material';
import { Launch } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHintDroidId, useDeviceUUID, useAsyncAction } from '../hooks';
import { BaseScreen, Dialog } from '../components';
import { Droid, User } from '../types';
import { useLocalStorage } from '@uidotdev/usehooks';

type QuestItemProps = Readonly<{
  description: string;
  imageUrl: string;
  variant: 'current' | 'active' | 'finished';
  onClick: () => void;
}>;

function colorByVariant(variant: QuestItemProps['variant']) {
  switch (variant) {
    case 'current':
      return '#ff988b';
    case 'active':
      return '#caa2ff';
    case 'finished':
      return '#9CD0B2';
    default:
      return;
  }
}

// TODO: add ripple
const QuestItem: FC<QuestItemProps> = ({ description, variant, imageUrl, onClick }) => (
  <Stack
    component={Paper}
    className="noise3"
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    gap={1}
    sx={{
      borderBottom: '2px solid black',
      borderColor: colorByVariant(variant),
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '0.25rem',
      cursor: 'pointer',
      opacity: variant === 'finished' ? 0.75 : 1,
      // color: '#ccc'
    }}
    onClick={onClick}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        minWidth: 64,
      }}
    >
      <Box
        component="img"
        sx={{ height: '100%', width: '100%', mixBlendMode: 'lighten' }}
        src={imageUrl}
        alt="A quest giver image"
      />
    </Box>
    <Typography
      variant="caption"
      sx={css`
        display: -webkit-box;
        max-width: 400px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 1px 1px 1px #111;
      `}
    >
      {description}
    </Typography>
    <IconButton color="inherit" size="small">
      <Launch color="inherit" />
    </IconButton>
  </Stack>
);

const QuestList: FC<{
  items: Array<Droid>;
  title: string;
  variant: QuestItemProps['variant'];
  onSelect: (item: Droid) => void;
}> = ({ items, title, variant, onSelect }) => (
  <Box component="section">
    <Typography variant="body2" color={colorByVariant(variant)} gutterBottom sx={{ ml: 2 }}>
      {title}
    </Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {items.map((item) => (
        <Box component="li" sx={{ mb: 2 }}>
          <QuestItem
            variant={variant}
            description={item.hint}
            imageUrl={`/droids/${item.name.toLowerCase()}.jpg`}
            onClick={() => onSelect(item)}
          />
        </Box>
      ))}
    </Box>
  </Box>
);

export const Quests = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState<Droid | null>(null);
  const [stored, setStored] = useHintDroidId();
  const deviceId = useDeviceUUID();
  const [currentQuestId, setCurrentQuestId] = useLocalStorage<number | undefined>('current-quest-id');

  const [{ data: droids }, getDroids] = useAxios<Droid[]>(
    {
      url: `/api/droids`,
      params: {
        deviceId,
      },
    },
    {
      manual: true,
    },
  );

  const [, getAll] = useAsyncAction(async () => {
    await getDroids();
  });

  useEffect(() => {
    if (id) {
      setStored(id);
    }
  }, [id, setStored]);

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    getAll();
  }, [deviceId, stored]);

  // TODO: finished quest vs non finished probably should be implemented on server side
  const currentQuests = droids?.filter((d) => d.order === currentQuestId);
  const activeQuests = droids?.filter((d) => d.order !== currentQuestId && d.activated && !droids[d.order]?.activated);
  const finishedQuests = droids?.filter((d) => d.order !== currentQuestId && d.activated && droids[d.order]?.activated);

  return (
    <BaseScreen title="Quests">
      <Stack gap={2}>
        {!!currentQuests?.length && (
          <QuestList title="Current" variant="current" items={currentQuests} onSelect={setSelected} />
        )}
        {!!activeQuests?.length && (
          <QuestList title="Active" variant="active" items={activeQuests} onSelect={setSelected} />
        )}
        {!!finishedQuests?.length && (
          <QuestList title="Finished" variant="finished" items={finishedQuests} onSelect={setSelected} />
        )}
      </Stack>
      <Dialog
        imageUrl={selected ? `/droids/${selected.name.toLowerCase()}.jpg` : ''}
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <Stack direction="column" gap={2}>
            <Typography variant="body2">
              <Typography component="span" variant="inherit" color="primary" sx={{ mr: 1, fontWeight: 'bold' }}>
                {selected.name}:
              </Typography>
              <Typography component="span" variant="inherit" sx={{ fontStyle: 'italic' }} align="justify">
                {selected.hint}
              </Typography>
            </Typography>
            {selected.order !== currentQuestId && !finishedQuests?.includes(selected) && (
              <Button
                variant="contained"
                sx={{ justifySelf: 'center' }}
                onClick={() => {
                  setCurrentQuestId(selected.order);
                  setSelected(null);
                }}
              >
                Accept
              </Button>
            )}
          </Stack>
        )}
      </Dialog>
    </BaseScreen>
  );
};

// TODO: not sure where this should belong, but for now
// just remove it from quests for simplicity
// TODO: add later
// probably it could be called on last scan and shown as a modal
// backend can send some info about quest finished or not
const TODOCongrats = () => {
  const deviceId = useDeviceUUID();
  const [showCongrats, setShowCongrats] = useState(false);

  const [, getUser] = useAxios<User>(`/api/users/${deviceId}`, {
    manual: true,
  });

  const [, getAll] = useAsyncAction(async () => {
    const { data } = await getUser();

    setShowCongrats(data.collectedDroids === data.totalDroids);
  });

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    getAll();
  }, [deviceId]);

  return (
    <Dialog imageUrl="/welcome.png" open={showCongrats} onClose={() => setShowCongrats(false)}>
      <Stack direction="column" gap={2}>
        <Typography align="center" color="#ff6855" variant="h6">
          Congratulations!
        </Typography>
        <Typography gutterBottom variant="body1" component="div" align="justify" sx={{}}>
          A fantastic achievement! You've finished all the quests we've prepared for you. You have proven yourself to be
          a master jedi.
        </Typography>
        <Typography align="center" sx={{ fontWeight: '700' }}>
          May the force be with you!
        </Typography>
        <Typography variant="caption" align="center">
          Thanks for playing our little game, your Coders of Republic team!
        </Typography>
      </Stack>
    </Dialog>
  );
};
