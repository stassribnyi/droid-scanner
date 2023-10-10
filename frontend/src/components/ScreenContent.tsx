import { Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const ScreenContent: FC<PropsWithChildren> = ({ children }) => (
  <Container maxWidth='xs' sx={{ flex: 1, overflowY: 'auto', pb: '28px' }}>
    {children}
  </Container>
);
