import {
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Box,
  Dialog,
  IconButton,
  CardMedia,
  Stack,
  css,
} from '@mui/material';
import { Close, Launch } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHintDroidId, useDeviceUUID, useAsyncAction } from '../hooks';
import { BaseScreen } from '../components';
import { Droid, User } from '../types';
import { useLocalStorage } from '@uidotdev/usehooks';

const DRDialog: FC<
  PropsWithChildren<
    Readonly<{
      open: boolean;
      imageUrl: string;
      onClose: () => void;
    }>
  >
> = ({ imageUrl, open, onClose, children }) => (
  <Dialog open={open} onClose={onClose}>
    <IconButton
      edge="start"
      color="inherit"
      onClick={onClose}
      aria-label="close"
      sx={{
        position: 'absolute',
        top: '0.5rem',
        right: '1rem',
        zIndex: 1,
      }}
    >
      <Close />
    </IconButton>
    <Card
      sx={{
        background: 'none',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: 340 }} image={imageUrl} title="green iguana" />
        <Box
          className="noise3"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            content: "''",
            opacity: 0.2,
          }}
        />
      </Box>

      <CardContent
        sx={{
          marginTop: '-6rem',
          borderRadius: '1.5rem',
          background: 'rgba(35, 45, 60, 0.5)',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          backdropFilter: 'blur(16px)',
        }}
      >
        {children}
      </CardContent>
    </Card>
  </Dialog>
);

{
  /* TODO: add ripple */
}
const QuestItem: FC<
  Readonly<{
    description: string;
    imageUrl: string;
    variant: 'current' | 'active' | 'done';
    onLaunch: () => void;
  }>
> = ({ description, variant, imageUrl, onLaunch }) => (
  <Stack
    component={Paper}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    gap={1}
    sx={{
      border: variant === 'current' ? `2px solid #ff6855` : variant === 'active' ? '2px solid #999' : null,
      borderRadius: '6px',
      overflow: 'hidden',
      padding: '0.25rem',
      cursor: 'pointer',
      // boxShadow: '1px 1px 6px #c4dec457',
    }}
    onClick={onLaunch}
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
      `}
    >
      {description}
    </Typography>
    <IconButton>
      <Launch />
    </IconButton>
  </Stack>
);

export const Quests = () => {
  const { id } = useParams();
  const [current, setCurrent] = useState<Droid | null>(null);
  const [stored, setStored] = useHintDroidId();
  const deviceId = useDeviceUUID();
  const [showCongrats, setShowCongrats] = useState(false);
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
  const [{ data: user }, getUser] = useAxios<User>(`/api/users/${deviceId}`, {
    manual: true,
  });

  console.log(currentQuestId);

  const [, getAll] = useAsyncAction(async () => {
    await getDroids();
    const { data } = await getUser();

    setShowCongrats(data.collectedDroids === data.totalDroids);
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

  return (
    <BaseScreen title="Quests">
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {droids
          ?.filter((d) => d.activated)
          .map((d, idx) => (
            <Box
              component="li"
              sx={{
                mb: 2,
              }}
            >
              <>
                {idx === 0 && (
                  <Typography variant="body2" color="primary" gutterBottom>
                    Current
                  </Typography>
                )}
                <QuestItem
                  variant={currentQuestId === d.order ? 'current' : !droids[idx + 1]?.activated ? 'active' : 'done'}
                  description={d.hint}
                  imageUrl={`/droids/${d.name.toLowerCase()}.jpg`}
                  onLaunch={() => setCurrent(d)}
                />
                {idx === 0 && <hr color="#333" style={{ marginTop: '1rem' }} />}
              </>
            </Box>
          ))}
      </Box>
      <DRDialog
        imageUrl={current ? `/droids/${current.name.toLowerCase()}.jpg` : ''}
        open={!!current}
        onClose={() => setCurrent(null)}
      >
        <Stack direction="column" gap={2}>
          <Typography variant="body2">
            <Typography component="span" variant="inherit" color="primary" sx={{ mr: 1, fontWeight: 'bold' }}>
              {current?.name}:
            </Typography>
            <Typography component="span" variant="inherit" sx={{ fontStyle: 'italic' }} align="justify">
              {current?.hint}
              {current?.hint}
              {current?.hint}
            </Typography>
          </Typography>
          <Button
            sx={{ justifySelf: 'center' }}
            onClick={() => {
              console.log(current);

              setCurrentQuestId(current?.order);

              setCurrent(null);
            }}
          >
            Accept
          </Button>
        </Stack>
      </DRDialog>
      <DRDialog imageUrl="/welcome.png" open={showCongrats} onClose={() => setShowCongrats(false)}>
        <Stack direction="column" gap={2}>
          <Typography align="center" color="#ff6855" variant="h6">
            Congratulations!
          </Typography>
          <Typography gutterBottom variant="body1" component="div" align="justify" sx={{}}>
            A fantastic achievement! You've finished all the quests we've prepared for you. You have proven yourself to
            be a master jedi.
          </Typography>
          <Typography align="center" sx={{ fontWeight: '700' }}>
            May the force be with you!
          </Typography>
          <Typography variant="caption" align="center">
            Thanks for playing our little game, your Coders of Republic team!
          </Typography>
        </Stack>
      </DRDialog>
    </BaseScreen>
  );
};
