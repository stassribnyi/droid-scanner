import {
  Card,
  CardContent,
  Typography,
  Paper,
  Collapse,
  Button,
  Box,
  Unstable_Grid2 as Grid,
  Dialog,
  IconButton,
  CardMedia,
  Stack,
} from '@mui/material';
import {
  Close,
  ExpandLess,
  ExpandMore,
  QuestionMark,
} from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useHintDroidId, useDeviceUUID, useAsyncAction } from '../hooks';
import { BaseScreen } from '../components';
import { collectedToRank } from '../utils';
import { Droid, User } from '../types';

const PLACEHOLDER_DROID: Droid = {
  id: '',
  name: 'Loading...',
  description: `Loading...`,
  order: 1,
  activated: false,
  hint: `Loading...`,
  imageUrl: '',
};

export const Hint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showHint, setShowHint] = useState(false);
  const [stored, setStored] = useHintDroidId();
  const deviceId = useDeviceUUID();
  const [showCongrats, setShowCongrats] = useState(false);

  const [{ data: found }, getDroid] = useAxios<Droid>(
    {
      url: `/api/droids/${deviceId}`,
      params: {
        deviceId,
        order: stored || 1,
      },
    },
    {
      manual: true,
    }
  );
  const [{ data }, getUser] = useAxios<User>(`/api/users/${deviceId}`, {
    manual: true,
  });

  const [, getAll] = useAsyncAction(async () => {
    await getDroid();
    const { data } = await getUser();

    setShowCongrats(data.collectedDroids === data.totalDroids);
  });

  useEffect(() => {
    if (id) {
      setStored(id);
    }
  }, [id, setStored]);

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    getAll();
  }, [deviceId, stored]);

  const droid = found ?? PLACEHOLDER_DROID;

  const user = data || {
    deviceId: deviceId,
    name: 'loading...',
    collectedDroids: 0,
    totalDroids: 0,
  };

  return (
    <BaseScreen title='Current Quest' onBack={() => navigate('/')}>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        spacing={1}
      >
        <Grid xs={4}>
          <Box
            sx={{
              height: '100px',
              width: '100px',
              border: '4px double #ff6855',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '1px 1px 6px #c4dec457',
            }}
          >
            {droid.activated ? (
              <Box
                component='img'
                sx={{ height: '100%', width: '100%' }}
                src={`/droids/${droid.name.toLowerCase()}.jpg`}
                alt={droid.name}
              />
            ) : (
              <QuestionMark sx={{ height: '100%', width: '100%' }} />
            )}
          </Box>
        </Grid>
        <Grid xs={8}>
          <Typography variant='body2' component='div'>
            Greetings{' '}
            <Typography variant='body2' component='span' color='#ff6855'>
              {collectedToRank(user.collectedDroids, user.totalDroids)}
            </Typography>
            !{' '}
            {droid?.activated
              ? `I have a small task for you. It will test your skills and
            challenge your mind. Shell we begin?`
              : `You don't know where this droid is, but he left some task for you...`}
          </Typography>
        </Grid>
      </Grid>
      <Card sx={{ mb: 2, mt: 2 }}>
        <CardContent sx={{ background: 'rgba(35, 45, 60, 0.4)' }}>
          <Typography
            gutterBottom
            variant='body2'
            sx={{ textIndent: '2rem' }}
            align='justify'
          >
            {droid.hint}
          </Typography>
        </CardContent>
      </Card>
      <Paper sx={{ p: 2, width: '100%' }}>
        {droid.activated ? (
          <Button onClick={() => setShowHint((value) => !value)}>
            Who am I?
            {showHint ? <ExpandLess /> : <ExpandMore />}
          </Button>
        ) : (
          <Box sx={{ p: 1 }}>
            <Typography color='info' variant='caption'>
              Find this droid to learn more about him.
            </Typography>
          </Box>
        )}
        <Collapse in={showHint} timeout='auto' unmountOnExit>
          <Typography
            gutterBottom
            variant='body2'
            sx={{ textIndent: '2rem' }}
            align='justify'
          >
            {droid.description}
          </Typography>
        </Collapse>
      </Paper>
      <Dialog open={showCongrats} onClose={() => setShowCongrats(false)}>
        <IconButton
          edge='start'
          color='inherit'
          onClick={() => setShowCongrats(false)}
          aria-label='close'
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '1rem',
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>
        {/* Consider reusing? */}
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
              borderRadius: '1.5rem',
              background: 'rgba(35, 45, 60, 0.5)',
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Stack direction='column' gap={2}>
              <Typography align='center' color='#ff6855' variant='h6'>
                Congratulations!
              </Typography>
              <Typography
                gutterBottom
                variant='body1'
                component='div'
                align='justify'
                sx={{}}
              >
                A fantastic achievement! You've finished all the quests we've
                prepared for you. You have proven yourself to be a master jedi.
              </Typography>
              <Typography align='center' sx={{ fontWeight: '700' }}>
                May the force be with you!
              </Typography>
              <Typography variant='caption' align='center'>
                Thanks for playing our little game, your Coders of Republic
                team!
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </BaseScreen>
  );
};
