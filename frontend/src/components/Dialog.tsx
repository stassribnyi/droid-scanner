import { FC, PropsWithChildren } from 'react';
import { Dialog as MUIDialog, IconButton, Card, Box, CardMedia, CardContent } from '@mui/material';
import { Close } from '@mui/icons-material';

// TODO: revisit and refactor if necessary
export const Dialog: FC<
  PropsWithChildren<
    Readonly<{
      open: boolean;
      imageUrl: string;
      onClose: () => void;
    }>
  >
> = ({ imageUrl, open, onClose, children }) => (
  <MUIDialog open={open} onClose={onClose}>
    <IconButton
      edge="start"
      color="inherit"
      onClick={onClose}
      aria-label="close"
      sx={{
        position: 'absolute',
        top: '0.5rem',
        right: '1rem',
        zIndex: 1,
      }}
    >
      <Close />
    </IconButton>
    <Card
      sx={
        {
          // background: 'none',
        }
      }
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia sx={{ height: 340 }} image={imageUrl} title="A droid image" />
        <Box
          className="noise3"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            content: "''",
            opacity: 0.2,
          }}
        />
      </Box>

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
        {children}
      </CardContent>
    </Card>
  </MUIDialog>
);
