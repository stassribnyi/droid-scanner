import {
  Avatar,
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
import { Navigation, ScreenContent } from '../components';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const [first, second] = name.split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 36,
      height: 36,
    },
    children: `${first[0].toUpperCase()}${second?.[0].toUpperCase() || ''}`,
  };
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// TODO: extract appbar
export const Dashboard = () => {
  // const navigate = useNavigate();

  return (
    <>
      <ScreenContent>
        <Card sx={{ mb: 2, mt: 2 }}>
          <CardMedia
            sx={{ height: 340 }}
            image='/droid-scanner/welcome.jpg'
            title='leader board welcome'
          />
          <CardContent
            sx={{
              marginTop: '-6rem',
              borderRadius: '2rem',
              background: 'rgba(35, 45, 60, 0.4)',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Typography
              variant='h5'
              component='div'
              align='center'
              sx={{ mb: 3 }}
            >
              Welcome,{' '}
              <Typography
                variant='h5'
                component='span'
                color='#ff6855'
                sx={{ fontWeight: 'bold' }}
              >
                R2-D2
              </Typography>
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, #9CD0B2, #7d9d8bde)',
                    boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #A7D9BD',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography
                      // color='text.secondary'
                      sx={{ fontWeight: 'bold' }}
                    >
                      Rank
                    </Typography>
                    <Typography>7</Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, rgba(222, 72, 53, 0.9), rgba(125, 29, 16, 0.9))',
                    boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #ff4b34',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography
                      // color='text.secondary'
                      sx={{ fontWeight: 'bold' }}
                    >
                      Collected
                    </Typography>
                    <Typography>8</Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper
                  sx={{
                    p: 1,
                    backgroundImage:
                      'linear-gradient(to bottom, #803DE1, #5b298e)',
                    boxShadow: '0px 3px 8px #250f0c,inset 0px 2px 3px #874cef',
                  }}
                >
                  <Stack alignItems='center' gap={1}>
                    <Typography
                      // color='text.secondary'
                      sx={{ fontWeight: 'bold' }}
                    >
                      Left
                    </Typography>
                    <Typography>12</Typography>
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
                <TableCell align='center'>Nickname</TableCell>
                <TableCell align='center'>Rank</TableCell>
                <TableCell align='center'>Collected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Stack direction='row' alignItems='center' gap={2}>
                      <Avatar {...stringAvatar(row.name)} />
                      <Typography variant='caption'>{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>{row.fat}</TableCell>
                  <TableCell align='center'>{row.carbs}</TableCell>
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
