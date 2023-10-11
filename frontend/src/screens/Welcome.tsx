import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import useAxios from 'axios-hooks';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  useAsyncAction,
  useDeviceUUID,
  useNotify,
  useSimpleAuth,
} from '../hooks';
import { ScreenContent } from '../components';

import type { User } from '../types';
import { tryParseDroidId } from '../utils';

function getCurrentURL(): string {
  return window.location.href;
}

export const Welcome = () => {
  const [nickname, setNickname] = useState('');
  const deviceId = useDeviceUUID();
  const navigate = useNavigate();
  const [hasAccess, grantAccess] = useSimpleAuth();
  const { notify } = useNotify();

  useEffect(() => {
    if (!hasAccess) {
      return;
    }

    notify(`DroidId: ${tryParseDroidId(getCurrentURL())}`);

    navigate('/dashboard');
  }, [hasAccess, navigate, notify]);

  const [, getGeneratedNickName] = useAxios('/api/users/generate-nickname', {
    manual: true,
  });

  const [, registerUser] = useAxios<User>(
    {
      method: 'POST',
      url: '/api/users/register',
      params: { userNickname: nickname, deviceId: deviceId },
    },
    { manual: true }
  );

  const [generating, generateName] = useAsyncAction(async () => {
    const { data } = await getGeneratedNickName();

    setNickname(data);
  });

  const [registering, register] = useAsyncAction(async () => {
    await registerUser();
    grantAccess();
  });

  return (
    <ScreenContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // pseudo validation
          const value = nickname.trim();

          if (!value) {
            setNickname('');

            return;
          }

          register();
        }}
      >
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
                image='/welcome.png'
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
                    required
                    label='What is your name, padawan?'
                    variant='outlined'
                    size='medium'
                    value={nickname}
                    onChange={({ target }) => setNickname(target.value)}
                  />
                  <Button
                    disabled={generating}
                    variant='text'
                    color='primary'
                    onClick={generateName}
                  >
                    Generate nickname
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Button
              disabled={registering}
              fullWidth
              variant='contained'
              size='large'
              type='submit'
            >
              Join Now!
            </Button>
          </Grid>
        </Grid>
      </form>
    </ScreenContent>
  );
};
