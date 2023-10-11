import {
  Card,
  CardContent,
  CardMedia,
  Unstable_Grid2 as Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { WorkspacePremium } from '@mui/icons-material';

import { useEffect } from 'react';
import useAxios from 'axios-hooks';

import { Navigation, ScreenContent } from '../components';
import { useAsyncAction, useDeviceUUID } from '../hooks';

import { collectedToRank, collectedToColor } from '../utils';
import { Rating, User } from '../types';

const createLeaderboardData = (rating: Rating, totalDroids: number) => ({
  name: rating.nickname,
  collected: rating.collectedDroids,
  rank: collectedToRank(rating.collectedDroids, totalDroids),
});

export const Dashboard = () => {
  const deviceId = useDeviceUUID();
  const [{ data: leadersData }, getLeaders] = useAxios<Array<Rating>>(
    '/api/users/leaderboard',
    {
      manual: true,
    }
  );
  const [{ data }, getUser] = useAxios<User>(`/api/users/${deviceId}`, {
    manual: true,
  });

  const [, getAll] = useAsyncAction(async () => {
    await getUser();
    await getLeaders();
  });

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    getAll();
  }, [deviceId]);

  const user = data || {
    deviceId: deviceId,
    name: 'loading...',
    collectedDroids: 0,
    totalDroids: 0,
  };

  const leaders = (leadersData ?? []).map((rating) =>
    createLeaderboardData(rating, user.totalDroids)
  );

  return (
    <>
      <ScreenContent>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardMedia
            sx={{ height: 340 }}
            image='/placeholder.jpg'
            title='leader board welcome'
          />
          <CardContent
            sx={{
              marginTop: '-6rem',
              borderRadius: '2rem',
              background: 'rgba(35, 45, 60, 0.75)',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Typography
              variant='h6'
              component='div'
              align='center'
              sx={{ mb: 3 }}
            >
              Welcome,
              <Typography
                variant='h6'
                color='#ff6855'
                sx={{ fontWeight: 'bold' }}
              >
                {user?.name}
              </Typography>
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, #76B591, #577163)',
                    boxShadow:
                      '0px 3px 8px rgba(0, 0, 0, 0.2),inset 0px 2px 3px #84B398',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography sx={{ fontWeight: 'bold' }}>Rank</Typography>
                    <Typography variant='body2'>
                      {collectedToRank(user.collectedDroids, user.totalDroids)}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(222, 72, 53, 0.9), rgba(125, 29, 16, 0.9))',
                    boxShadow:
                      '0px 3px 8px rgba(0, 0, 0, 0.2),inset 0px 2px 3px #dc422f',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Collected
                    </Typography>
                    <Typography variant='body2'>
                      {user?.collectedDroids}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, #803DE1, #5b298e)',
                    boxShadow:
                      '0px 3px 8px rgba(0, 0, 0, 0.2),inset 0px 2px 3px #874cef',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography sx={{ fontWeight: 'bold' }}>Left</Typography>
                    <Typography variant='body2'>
                      {user.totalDroids - user.collectedDroids}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography gutterBottom variant='h5' align='center'>
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label='Ranks table' size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ padding: 0 }}></TableCell>
                <TableCell sx={{ padding: '6px 12px' }}>Nickname</TableCell>

                <TableCell align='center' sx={{ padding: '6px 12px' }}>
                  Collected
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaders.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <WorkspacePremium
                      sx={{
                        height: '28px',
                        width: '28px',
                        color: collectedToColor(
                          row.collected,
                          user.totalDroids
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='caption'>{row.name}</Typography>
                  </TableCell>

                  <TableCell align='center'>
                    <Typography variant='caption' sx={{ fontWeight: 500 }}>
                      {row.collected}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScreenContent>
      <Navigation />
    </>
  );
};
