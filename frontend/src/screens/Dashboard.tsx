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

import { FC, PropsWithChildren } from 'react';
import useAxios from 'axios-hooks';

import { Navigation, ScreenContent } from '../components';

import { collectedToRank, collectedToColor } from '../utils';
import { Rating } from '../types';
import { useAuthContext } from '../providers';

const createLeaderboardData = (rating: Rating, totalDroids: number) => ({
  name: rating.nickname,
  collected: rating.collectedDroids,
  rank: collectedToRank(rating.collectedDroids, totalDroids),
});

const calculateProgress = (collected: number, total: number): string => {
  return `${((collected / total) * 100).toFixed(1)}%`;
};

const InfoItem: FC<PropsWithChildren<Readonly<{ label: string; color?: string }>>> = ({ label, color, children }) => (
  <Paper
    sx={{
      p: 1,
      background: 'transparent',
      boxShadow: 'inset 2px 2px 6px 0 rgba(0, 0, 0, 0.3), inset -1px -2px 6px 0 rgba(255, 255, 255, 0.07)',
    }}
  >
    <Stack alignItems="center" gap={1}>
      <Typography variant="body2">{label}</Typography>
      <Typography sx={{ color, fontWeight: 'bold' }}>{children}</Typography>
    </Stack>
  </Paper>
);

export const Dashboard = () => {
  const [{ data: leadersData }] = useAxios<Array<Rating>>('/api/users/leaderboard');
  const { user } = useAuthContext();

  const leaders = (leadersData ?? []).map((rating) => createLeaderboardData(rating, user?.totalDroids ?? 0));

  return (
    <>
      <ScreenContent>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardMedia sx={{ height: 340 }} image="/placeholder.jpg" title="leader board welcome" />
          <CardContent
            sx={{
              marginTop: '-6rem',
              borderRadius: '1.5rem',
              background: 'rgba(35, 45, 60, 0.75)',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ mb: 3, textShadow: '2px 1px 4px rgba(0, 0, 0, 0.3)' }}
            >
              Welcome,
              <Typography variant="h6" color="#ff6855" sx={{ fontWeight: 'bold' }}>
                {user?.name ?? 'Loading...'}
              </Typography>
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <InfoItem label="Rank" color={collectedToColor(user?.collectedDroids ?? 0, user?.totalDroids ?? 0)}>
                  {collectedToRank(user?.collectedDroids ?? 0, user?.totalDroids ?? 0)}
                </InfoItem>
              </Grid>
              <Grid xs={4}>
                <InfoItem label="Collected" color="#ff988b">
                  {user?.collectedDroids ?? 0}
                </InfoItem>
              </Grid>
              <Grid xs={4}>
                <InfoItem label="Progress" color="#caa2ff">
                  {calculateProgress(user?.collectedDroids ?? 0, user?.totalDroids ?? 0)}
                </InfoItem>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography gutterBottom variant="h5" align="center">
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="Ranks table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ padding: 0 }}></TableCell>
                <TableCell sx={{ padding: '6px 12px' }}>Nickname</TableCell>

                <TableCell align="center" sx={{ padding: '6px 12px' }}>
                  Progress
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaders.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <WorkspacePremium
                      sx={{
                        height: '28px',
                        width: '28px',
                        color: collectedToColor(row.collected, user?.totalDroids ?? 0),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{row.name}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {calculateProgress(row.collected, user?.totalDroids ?? 0)}
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
