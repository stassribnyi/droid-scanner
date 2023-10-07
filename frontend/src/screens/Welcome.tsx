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
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ScreenContent } from '../components';

const DROID_NAMES = [
  'O-99A',
  '5-X4',
  '2-G7',
  '71P-6',
  'HF-43',
  'K-SP',
  '0H5-X',
  'F1-08',
  '0-P0Y',
  'X0-6',
  '0-3O',
  '17-Z',
  'H-I0I',
  '4-03',
  'O-739',
  'K-NJN',
  'D3-8J',
  '45R-R',
  'UUM-5',
  '68-T0',
] as const;

const generateDroidName = () => {
  return DROID_NAMES[Math.floor(Math.random() * DROID_NAMES.length)];
};

export const Welcome = () => {
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

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
                  value={nickName}
                  onChange={({ target }) => setNickName(target.value)}
                />
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => setNickName(generateDroidName())}
                >
                  Generate nickname
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Button
            fullWidth
            variant='contained'
            size='large'
            onClick={() => navigate('/')}
          >
            Join Now!
          </Button>
        </Grid>
      </Grid>
    </ScreenContent>
  );
};
