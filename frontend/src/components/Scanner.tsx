import { useRef, useState } from 'react';
import QrReader from 'react-qr-reader';
import { Box, Typography } from '@mui/material';

// const HINT = 'Please point your camera at the QR code you want to scan. Make sure the QR code is fully visible and in focus. The app will automatically detect and process the QR code for you.'

// const ViewFinderBase = styled(Box)({
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   width: '50%',
//   height: '50%',
//   zIndex: 1,
//   transform: 'translate(-50%, -50%)',
// });

// const ViewFinder = () => (
//   <>
//     <ViewFinderBase
//       sx={{
//         background: `linear-gradient(#ff6855, #ff6855) top left,
//                    linear-gradient(#ff6855, #ff6855) top left,
//                    linear-gradient(#ff6855, #ff6855) top right,
//                    linear-gradient(#ff6855, #ff6855) top right,
//                    linear-gradient(#ff6855, #ff6855) bottom left,
//                    linear-gradient(#ff6855, #ff6855) bottom left,
//                    linear-gradient(#ff6855, #ff6855) bottom right,
//                    linear-gradient(#ff6855, #ff6855) bottom right`,
//         backgroundSize: '2px 20px, 20px 2px',
//         backgroundRepeat: 'no-repeat',
//       }}
//     />
//     <ViewFinderBase
//       sx={{
//         width: '60%',
//         height: '60%',
//         outline: '1000px solid #393939',
//       }}
//     />
//   </>
// );

export const Scanner: React.FC<{
  onResult: (data?: string) => void;
}> = ({ onResult }) => {
  const [error, setError] = useState('Please align with QR code');
  const qrReader = useRef();

  const handleScan: QrReader['props']['onScan'] = (data) => {
    if (!data) {
      return;
    }

    onResult(data);
  };

  const handleError: QrReader['props']['onError'] = (error) => {
    if (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ position: 'relative' }} ref={qrReader}>
      <QrReader
        delay={500}
        facingMode='environment'
        showViewFinder
        onScan={handleScan}
        onError={handleError}
      />
      <Typography
        variant='body1'
        align='center'
        sx={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 1 }}
      >
        {error}
      </Typography>
    </Box>
  );
};
