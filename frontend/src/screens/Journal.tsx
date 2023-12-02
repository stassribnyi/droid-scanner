import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BaseScreen } from '../components';
import { FC, useEffect, useState } from 'react';
import { QuestionMark } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { useAsyncAction, useDeviceUUID } from '../hooks';
import { Droid } from '../types';

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
      <Stack
        alignItems="center"
        spacing={1}
        sx={{
          position: 'relative',
        }}
      >
        {activated ? (
          <img alt={name} src={imageUrl} style={{ width: 80, height: 80, mixBlendMode: 'lighten' }} />
        ) : (
          <QuestionMark sx={{ width: 80, height: 80, color: '#fdfcfa' }} />
        )}
        <Typography variant="caption" color="#ff6855" sx={{ width: '100%', fontSize: 12 }} align="center">
          {activated ? name : 'Not Found'}
        </Typography>
        <Typography
          variant="caption"
          color="#caa357"
          sx={{
            top: -4,
            right: 0,
            m: '0!important',
            fontWeight: 'bold',
            position: 'absolute',
          }}
        >
          {idx}
        </Typography>
      </Stack>
    </Paper>
  );
};

const compareByActivated = (d1: Droid, d2: Droid) => (d1.activated === d2.activated ? 0 : d1.activated ? -1 : 1);

const compareByOrder = (d1: Droid, d2: Droid) => d1.order - d2.order;

export const Journal = () => {
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
    },
  );

  const [, getAll] = useAsyncAction(async () => {
    const { data } = await getMyCollection();

    setDroids((data?.length ?? 0) > 0 ? data.sort(compareByOrder) : []);
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
    <BaseScreen title="My Journal">
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }} alignItems="center">
        <Typography>Droids you've found</Typography>
        <FormControl size="small" sx={{ minWidth: '130px' }}>
          <InputLabel id="order-by-select-label">Sort By</InputLabel>
          <Select
            labelId="order-by-select-label"
            id="order-by-select"
            value={orderBy}
            label="Order By"
            onChange={({ target }) => setOrderBy(target.value as 'order' | 'collected')}
          >
            <MenuItem value="order">Order</MenuItem>
            <MenuItem value="collected">Collected</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}
      >
        {droids.map((droid) => (
          <DroidCard
            key={droid.name}
            idx={droid.order}
            name={droid.name}
            imageUrl={`/droids/${droid.name.toLocaleLowerCase()}.jpg`}
            activated={droid.activated}
            onClick={(id) => navigate(`/quests/${id}`)}
          />
        ))}
      </Box>
    </BaseScreen>
  );
};
