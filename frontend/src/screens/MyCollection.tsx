import {
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { BaseScreen } from '../components';
import { FC, useEffect, useState } from 'react';
import { QuestionMark } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { useAsyncAction, useDeviceUUID } from '../hooks';
import { Droid } from '../types';

const InfoGrid: FC<{
  items: Array<React.ReactElement>;
  itemsPerColumn: number;
}> = ({ items, itemsPerColumn }) => {
  const rows = [];

  for (
    let rowIdx = 0;
    rowIdx < Math.ceil(items.length / itemsPerColumn);
    rowIdx++
  ) {
    const cells = [];

    for (let cellIdx = 0; cellIdx < itemsPerColumn; cellIdx++) {
      const itemIdx = itemsPerColumn * rowIdx + cellIdx;

      if (items.length <= itemIdx) {
        break;
      }

      cells.push(
        <Grid xs={Math.floor(12 / itemsPerColumn)}>{items[itemIdx]}</Grid>
      );
    }

    rows.push(<Grid container>{cells}</Grid>);
  }

  return (
    <Grid container direction='column' spacing={2}>
      {rows}
    </Grid>
  );
};

const DROID_NAMES = [
  { name: 'C-3PO' },
  { name: 'R2-D2' },
  { name: 'R5-D4' },
  { name: 'AP-5' },
  { name: 'BD-1' },
  { name: 'C1-10P' },
  { name: 'Mouse Droid' },
  { name: '4-LOM' },
  { name: 'IG-11' },
  { name: 'EV-9D9' },
  { name: 'R1-J5' },
  { name: 'BB-8' },
  { name: '2-1B' },
  { name: 'L3-37' },
  { name: 'K-2SO' },
  { name: 'D-O' },
  { name: 'CB-23' },
  { name: 'Mister Bones' },
  { name: 'R-3X' },
  { name: 'Battle Droid' },
];

function getDroidInfo(order: number): Droid {
  const name = DROID_NAMES[order - 1].name;

  return {
    id: (Math.random() * 100).toString(),
    imageUrl: `/droid-scanner/droids/${name.toLowerCase()}.jpg`,
    order,
    hint: 'some hint',
    name: name,
    description: 'description test',
    activated: Math.floor(Math.random() * 100) >= 0,
  };
}

const DroidCard: FC<{
  idx: number;
  name: string;
  imageUrl: string;
  activated: boolean;
  onClick: (id: number) => void;
}> = ({ idx, name, imageUrl, activated, onClick }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        padding: '8px',
        cursor: 'pointer',

        transition: theme.transitions.create(['transform'], {
          duration: theme.transitions.duration.standard,
        }),

        '&:hover': {
          transform: 'rotate3d(1, 1, 1, 5deg) scale(1.1)',
        },
      }}
      onClick={() => onClick(idx)}
    >
      <Stack alignItems='center' spacing={1}>
        {activated ? (
          <img
            alt={name}
            src={imageUrl}
            style={{ width: 100, height: 100, mixBlendMode: 'lighten' }}
          />
        ) : (
          <QuestionMark sx={{ width: 100, height: 100 }} />
        )}
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ width: '100%' }}
        >
          <Typography variant='caption' color='#ff6855'>
            {activated ? name : 'Not Found'}
          </Typography>
          <Typography variant='caption'>{idx}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

const fakeDroids = (): Array<Droid> =>
  Array(20)
    .fill(1)
    .map((item, idx) => getDroidInfo(item + idx));

const compareByActivated = (d1: Droid, d2: Droid) =>
  d1.activated === d2.activated ? 0 : d1.activated ? -1 : 1;

const compareByOrder = (d1: Droid, d2: Droid) => d1.order - d2.order;

export const MyCollection = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState<'order' | 'collected'>('order');
  const deviceId = useDeviceUUID();
  const [droids, setDroids] = useState<Array<Droid>>([]);
  const [, getMyCollection] = useAxios<Array<Droid>>(
    {
      url: '/api/droids',
      params: {
        deviceId,
      },
    },
    {
      manual: true,
    }
  );

  const [, getAll] = useAsyncAction(async () => {
    const { data } = await getMyCollection();

    setDroids((data?.length ?? 0) > 0 ? data : fakeDroids());
    setDroids(fakeDroids());
  });

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    getAll();
  }, [deviceId]);

  useEffect(() => {
    switch (orderBy) {
      case 'collected':
        setDroids((droids) => [...droids].sort(compareByActivated));

        return;
      case 'order':
        setDroids((droids) => [...droids].sort(compareByOrder));

        return;
      default:
        return;
    }
  }, [orderBy]);

  return (
    <BaseScreen title='My Collection' onBack={() => navigate('/')}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ mb: 3 }}
        alignItems='center'
      >
        <Typography>Want to sort your collection?</Typography>
        <FormControl size='small' sx={{ minWidth: '130px' }}>
          <InputLabel id='order-by-select-label'>Order By</InputLabel>
          <Select
            labelId='order-by-select-label'
            id='order-by-select'
            value={orderBy}
            label='Order By'
            onChange={({ target }) =>
              setOrderBy(target.value as 'order' | 'collected')
            }
          >
            <MenuItem value='order'>Order</MenuItem>
            <MenuItem value='collected'>Collected</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <InfoGrid
        itemsPerColumn={3}
        items={droids.map((droid) => (
          <DroidCard
            key={droid.id}
            idx={droid.order}
            name={droid.name}
            imageUrl={droid.imageUrl}
            activated={droid.activated}
            onClick={(id) => navigate(`/hint/${id}`)}
          />
        ))}
      />
    </BaseScreen>
  );
};
