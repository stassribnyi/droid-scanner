import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Box, keyframes } from '@mui/material';

const shakeEffect = keyframes`
   0% { transform: translateX(0rem) }
   25% { transform: translateX(0.25rem) }
   75%{ transform: translateX(-0.25rem) }
   100% { transform: translateX(0rem) }
`;

export const Shake: FC<PropsWithChildren<Readonly<{ enabled: boolean }>>> = ({
  enabled,
  children,
}) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setShake(enabled);

    const timeoutId = setTimeout(() => setShake(false), 500);

    return () => clearTimeout(timeoutId);
  }, [enabled]);

  return (
    <Box
      sx={(theme) => ({
        ...(shake && {
          animation: `${shakeEffect} 0.2s ${theme.transitions.easing.easeInOut} 0s 2`,
        }),
      })}
    >
      {children}
    </Box>
  );
};
