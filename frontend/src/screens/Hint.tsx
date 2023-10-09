import { useNavigate, useParams } from 'react-router';
import { BaseScreen } from '../components';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Collapse,
  Button,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useHintDroidId } from '../hooks/useHintDroidId';

export const Hint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showHint, setShowHint] = useState(false);
  const [stored, setStored] = useHintDroidId();
console.log(stored);

  useEffect(() => {
    if (id) {
      setStored(id);
    }
  }, [id, setStored]);

  return (
    <BaseScreen
      title='Current Hint'
      onBack={() =>
        id === stored ? navigate('/my-collection') : navigate('/')
      }
    >
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
            Here is some hint for you, padawan!
          </Typography>
          <Paper sx={{ p: 1, width: '100%' }}>
            <Button onClick={() => setShowHint((value) => !value)}>
              {showHint ? 'Hide' : 'Show first'} hint{' '}
              {showHint ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={showHint} timeout='auto' unmountOnExit>
              <Typography variant='body2'>
                You have a score to settle with this droid, who once betrayed
                you in a crucial mission. You have tracked him down to a
                location where people work, but you need to be more specific.
                Look for a table with some papers and a computer on it. There
                might be a plant nearby, adding some greenery to the dull
                environment. Scan the QR code on the droid’s head to confront
                him and get your revenge.
              </Typography>
            </Collapse>
          </Paper>
        </CardContent>
      </Card>
    </BaseScreen>
  );
};
