import { useNavigate, useParams } from 'react-router';
import { BaseScreen } from '../components';
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Collapse,
  Button,
  Box,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { ExpandLess, ExpandMore, QuestionMark } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useHintDroidId } from '../hooks/useHintDroidId';
import useAxios from 'axios-hooks';
import { useDeviceUUID, useAsyncAction } from '../hooks';
import { Droid, User } from '../types';
import { collectedToRank } from '../utils';

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
  console.log(stored);
  
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
    await getUser();
    await getDroid();
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

  // const found = droid;

  const droid = found ?? PLACEHOLDER_DROID;

  const user = data || {
    deviceId: deviceId,
    name: 'loading...',
    collectedDroids: 0,
    totalDroids: 0,
  };

  return (
    <BaseScreen
      title='Current Quest'
      onBack={() =>
        id === stored ? navigate('/my-collection') : navigate('/')
      }
    >
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
      <Paper sx={{ p: 1, width: '100%' }}>
        {droid.activated ? (
          <Button onClick={() => setShowHint((value) => !value)}>
            {showHint ? 'Who am I?' : 'Wanna chat more?'}
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
    </BaseScreen>
  );
};
