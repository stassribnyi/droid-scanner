import { FC, useState } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  QrCodeScannerRounded,
  EmojiEventsRounded,
  TipsAndUpdatesRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const Navigation: FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  return (
    <BottomNavigation
      showLabels
      value={current}
      onChange={(_, newValue) => {
        setCurrent(newValue);
      }}
    >
      <BottomNavigationAction
        label='Current hint'
        icon={<TipsAndUpdatesRounded />}
        onClick={() => navigate('/')}
      />
      <BottomNavigationAction
        label='Found droid?'
        icon={<QrCodeScannerRounded />}
        onClick={() => navigate('/scan')}
      />
      <BottomNavigationAction
        label='Progress'
        icon={<EmojiEventsRounded />}
        onClick={() => navigate('/')}
      />
    </BottomNavigation>
  );
};
