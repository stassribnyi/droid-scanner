import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ScreenContent } from '../components';

import axios from 'axios';
import { useDeviceUUID, useLoader, useNotify } from '../hooks';
import { isAxiosError } from 'axios';
import { formatError } from '../utils';

type User = Readonly<{
  id: string;
  name: string;
  deviceId: string;
  rank: string;
  collectedDroids: Array<object>;
}>;

export const Welcome = () => {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useLoader();
  const navigate = useNavigate();
  const { notify } = useNotify();
  const deviceId = useDeviceUUID();
  async function asyncAction(action: () => Promise<void>) {
    try {
      setLoading(true);
      await action();
    } catch (error) {
      notify({ message: formatError(error), severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  function generateName() {
    asyncAction(async () => {
      const { data } = await axios.get<string>(`/api/users/generate-nickname`);
      setNickname(data);
    });
  }

  function register() {
    asyncAction(async () => {
      const params = new URLSearchParams({
        userNickname: nickname,
        deviceId: deviceId,
      });

      const { data: user } = await axios.post<User>(
        `/api/users/register?${params}`
      );

      console.log(user);

      navigate('/');
    });
  }

  return (
    <ScreenContent>
      <Grid
        container
        justifyContent='center'
        spacing={3}
        sx={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <Grid>
          <Typography
            variant='h5'
            style={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              WebkitTextStroke: '1.5px #ff6855',
              letterSpacing: '1px',
            }}
          >
            Droids of Republic
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Card
            sx={{
              background: 'none',
            }}
          >
            <CardMedia
              sx={{ height: 340 }}
              image='/droid-scanner/welcome.png'
              title='green iguana'
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
              <Stack direction='column' gap={2}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  align='center'
                >
                  Welcome to our ranks!
                </Typography>

                <TextField
                  label='What is your name, padawan?'
                  variant='outlined'
                  size='medium'
                  value={nickname}
                  onChange={({ target }) => setNickname(target.value)}
                />
                <Button
                  disabled={loading}
                  variant='text'
                  color='primary'
                  onClick={() => generateName()}
                >
                  Generate nickname
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Button fullWidth variant='contained' size='large' onClick={register}>
            Join Now!
          </Button>
        </Grid>
      </Grid>
    </ScreenContent>
  );
};
