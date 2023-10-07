import { FC } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Favorite, LocationOn, Restore } from '@mui/icons-material';

export const Navigation: FC = () => (
  <BottomNavigation showLabels>
    <BottomNavigationAction label='Recents' icon={<Restore />} />
    <BottomNavigationAction label='Favorites' icon={<Favorite />} />
    <BottomNavigationAction label='Nearby' icon={<LocationOn />} />
  </BottomNavigation>
);
