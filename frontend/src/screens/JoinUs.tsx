import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
} from '@mui/material';

import useAxios from 'axios-hooks';

import { useCallback } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNotify } from '../hooks';
import { ScreenContent, Shake } from '../components';

import { useAuthContext } from '../providers/AuthProvider';

type RegisterForm = Readonly<{ nickname: string }>;

const schema = yup.object({ nickname: yup.string().trim().required("Sorry, I didn't get it!") }).required();

export const JoinUs = () => {
  const { notify } = useNotify();
  const { register } = useAuthContext();
  const { control, handleSubmit, setValue, formState } = useForm<RegisterForm>({
    defaultValues: { nickname: '' },
    resolver: yupResolver(schema),
  });

  const [{ loading: isGenerating }, getGenerateNickname] = useAxios('/api/users/generate-nickname', { manual: true });

  const generateNickname = useCallback(async () => {
    try {
      const { data } = await getGenerateNickname();

      setValue('nickname', data);
    } catch (error) {
      notify({
        message: 'Droid is trying to come up with the nickname for you, but he is struggling. Try again later!',
        severity: 'error',
      });
    }
  }, [getGenerateNickname, notify, setValue]);

  return (
    <ScreenContent>
      <form onSubmit={handleSubmit(({ nickname }) => register(nickname))}>
        <Grid
          container
          justifyContent="center"
          spacing={3}
          sx={{
            paddingTop: '2rem',
            paddingBottom: '2rem',
          }}
        >
          <Grid>
            <Typography
              variant="h5"
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
              <CardMedia sx={{ height: 340 }} image="/welcome.png" title="Welcome droid" />
              <CardContent
                sx={{
                  marginTop: '-6rem',
                  borderRadius: '1.5rem',
                  background: 'rgba(35, 45, 60, 0.5)',
                  borderBottomLeftRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <Stack direction="column" gap={2}>
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    Welcome to our ranks!
                  </Typography>
                  <Controller
                    name="nickname"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Shake enabled={!!error}>
                        <TextField
                          {...field}
                          fullWidth
                          size="medium"
                          variant="outlined"
                          error={!!error}
                          helperText={error?.message}
                          label="What is your name, padawan?"
                        />
                      </Shake>
                    )}
                  />

                  <Button variant="text" color="primary" disabled={isGenerating} onClick={generateNickname}>
                    Generate nickname
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12}>
            <Button
              disabled={formState.isSubmitting || isGenerating}
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={(theme) => ({
                transition: theme.transitions.create(['filter'], {
                  duration: theme.transitions.duration.standard,
                }),
                ...(!formState.isValid && { filter: 'brightness(0.75)' }),
              })}
            >
              Join Now!
            </Button>
          </Grid>
        </Grid>
      </form>
    </ScreenContent>
  );
};

// TODO: move droid activation

// function getCurrentURL(): string {
//   return window.location.href;
// }
// const activateDroid = useActivateDroid();
// useEffect(() => {
//   if (hasAccess) {
//     navigate('/')

//     return;
//   }

//   // // Handle droidId activation if scanned via smartphone camera
//   // activateDroid(tryParseDroidId(getCurrentURL())).finally(() =>
//   //   // Remove any query params left after activation
//   //   history.replaceState({}, '', '/dashboard'),
//   // );
// }, [hasAccess, navigate]);
