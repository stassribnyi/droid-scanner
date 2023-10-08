import { Stack, Typography } from '@mui/material';
import { Navigation, ScreenContent } from '../components';

// TODO: extract appbar
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
      </ScreenContent>
      <Navigation />
    </>
  );
};
