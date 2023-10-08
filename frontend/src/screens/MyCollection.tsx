import {
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { BaseScreen } from '../components';
import { FC, useState } from 'react';

const InfoGrid: FC<{
  items: Array<React.ReactElement>;
  itemsPerColumn: order;
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
        <Grid
          xs={Math.floor(12 / itemsPerColumn)}
          container
          justifyContent='center'
        >
          {items[itemIdx]}
        </Grid>
      );
    }

    rows.push(
      <Grid direction='row' container spacing={2}>
        {cells}
      </Grid>
    );
  }

  return (
    <Grid container direction='column' spacing={4}>
      {rows}
    </Grid>
  );
};

const DROID_IMAGES = [
  '/droid-scanner/c3po.jpg',
  '/droid-scanner/bb8.jpg',
  '/droid-scanner/k2so.jpg',
  '/droid-scanner/r2d2.jpg',
  '/droid-scanner/battle-droid.jpg',
];

const DroidCard: FC<{
  idx: number;
}> = ({ idx }) => {
  function getDroidImage() {
    return DROID_IMAGES[Math.floor(Math.random() * DROID_IMAGES.length)];
  }
  return (
    <Stack
      alignItems='center'
      spacing={1}
      sx={{
        border: '1px solid #2b3f4b94',
        padding: '8px 4px 4px',
        borderRadius: '2px',
        background: '#232c3b',
        boxShadow: '1px 1px 4px #79a1ff2b',
        width: '100%',
        margin: 0.5,
      }}
    >
      <img
        alt='r2d2'
        src={getDroidImage()}
        style={{ width: 100, height: 100, mixBlendMode: 'lighten' }}
      />
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ width: '100%' }}
      >
        <Typography variant='caption' color='#ff6855'>
          R2D2
        </Typography>
        <Typography variant='caption'>{idx} / 20</Typography>
      </Stack>
    </Stack>
  );
};

export const MyCollection = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState<'order' | 'collected'>('order');

  return (
    <BaseScreen title='My Collection' onBack={() => navigate('/')}>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 3 }} alignItems='center'>
        <Typography>Want to sort your collection?</Typography>
        <FormControl size='small'>
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
        items={Array(20)
          .fill(1)
          .map((item, idx) => (
            <DroidCard idx={idx + item} />
          ))}
      />
    </BaseScreen>
  );
};
