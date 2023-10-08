import {
  // Avatar,
  // Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardMedia,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
// import { useNavigate } from 'react-router';
import { Navigation, ScreenContent } from '../components';
import { FC } from 'react';

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
        background: '#000',
        boxShadow: '1px 1px 4px #79a1ff2b',
      }}
    >
      <img alt='r2d2' src={getDroidImage()} style={{ width: 84, height: 84 }} />
      <Stack direction='row' spacing={2}>
        <Typography variant='caption' color='orange'>
          R2D2
        </Typography>
        <Typography variant='caption'>{idx} / 20</Typography>
      </Stack>
    </Stack>
  );
};

export const Dashboard = () => {
  // const navigate = useNavigate();

  return (
    <>
      <ScreenContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ paddingBottom: 6, paddingTop: 4 }}
        >
          <img
            alt='r3s6'
            src='/droid-scanner/welcome.jpg'
            style={{ width: 64, height: 64 }}
          />

          <Stack>
            <Typography>Welcome, Username</Typography>
            <Stack direction='row' justifyContent='space-between'>
              <Typography>Your score</Typography>
              <Typography>4 / 20</Typography>
            </Stack>
          </Stack>
        </Stack>
        <InfoGrid
          itemsPerColumn={3}
          items={Array(20)
            .fill(1)
            .map((item, idx) => (
              <DroidCard idx={idx + item} />
            ))}
        />
        {/* <Button onClick={() => navigate('/welcome')}>Go to welcome page</Button> */}
      </ScreenContent>
      <Navigation />
    </>
  );
};
