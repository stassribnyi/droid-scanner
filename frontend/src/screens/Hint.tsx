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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useHintDroidId } from '../hooks/useHintDroidId';
import useAxios from 'axios-hooks';
import { useDeviceUUID, useAsyncAction } from '../hooks';
import { Droid, User } from '../types';
import { collectedToRank } from '../utils';

export const Hint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showHint, setShowHint] = useState(false);
  const [stored, setStored] = useHintDroidId();
  const deviceId = useDeviceUUID();
  const [, getDroid] = useAxios<Array<Droid>>(
    {
      url: '/api/droids',
      params: {
        deviceId,
        order: stored,
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
  }, [deviceId]);

  // const droid = (droids ?? []).find((d) => d.order === +stored);

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
            <Box
              component='img'
              sx={{ height: '100%', width: '100%' }}
              // /droids/${name.toLowerCase()}.jpg
              src='/droids/4-lom.jpg'
              alt='leader board welcome'
            />
          </Box>
        </Grid>
        <Grid xs={8}>
          <Typography variant='body2' component='div'>
            Greetings{' '}
            <Typography variant='body2' component='span' color='#ff6855'>
              {collectedToRank(user.collectedDroids, user.totalDroids)}
            </Typography>
            , I have a small task for you. It will test your skills and
            challenge your mind. Shell we begin?
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
            {
            // droid?.hint
            //   ? droid.hint
            //   : 
              `You have a score to settle with this droid, who once betrayed
                you in a crucial mission. You have tracked him down to a
                location where people work, but you need to be more specific.
                Look for a table with some papers and a computer on it. There
                might be a plant nearby, adding some greenery to the dull
                environment. Scan the QR code on the droid’s head to confront
                him and get your revenge.`}
          </Typography>
        </CardContent>
      </Card>
      <Paper sx={{ p: 1, width: '100%' }}>
        <Button onClick={() => setShowHint((value) => !value)}>
          {showHint ? 'Who am I?' : 'Wanna chat more?'}
          {showHint ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Collapse in={showHint} timeout='auto' unmountOnExit>
          <Typography
            gutterBottom
            variant='body2'
            sx={{ textIndent: '2rem' }}
            align='justify'
          >
            {
            // !droid?.hint
            //   ? droid.hint
            //   : 
              `I am 4-LOM, the insectoid bounty hunter turned protocol droid, brings tracking and capturing expertise to your team.`}
          </Typography>
        </Collapse>
      </Paper>
    </BaseScreen>
  );
};
