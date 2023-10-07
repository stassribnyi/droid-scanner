import {
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Navigation, ScreenContent } from '../components';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <ScreenContent>
        <Typography align='center'>Dashboard page</Typography>
        <Button onClick={() => navigate('/welcome')}>Go to welcome page</Button>
      </ScreenContent>
      <Navigation />
    </>
  );
};
