import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

function tryParseDroidId(data: string) {
  try {
    const url = new URL(data);
    const droidId = url.searchParams.get('droidId');

    if (!droidId) {
      return null;
    }

    return parseInt(droidId, 10);
  } catch (err) {
    return null;
  }
}

// const HINT = 'Please point your camera at the QR code you want to scan. Make sure the QR code is fully visible and in focus. The app will automatically detect and process the QR code for you.'

const ViewFinder = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      border: '2px solid rgba(235,155,255,0.5)',
      width: '50%',
      height: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  ></div>
);

export const Scanner: React.FC<{
  onResult: (id: number) => void;
}> = ({ onResult }) => {
  const [data, setData] = useState('Please align with QR code');

  useEffect(() => {
    const droidId = tryParseDroidId(data);

    if (droidId) {
      onResult(droidId);
    }
  }, [data, onResult]);

  return (
    <>
      <QrReader
        scanDelay={250}
        constraints={{
          facingMode: 'environment',
        }}
        ViewFinder={ViewFinder}
        onResult={(result, error) => {
          if (result) {
            setData(result?.getText());
          }

          if (error) {
            setData(error.message);
          }
        }}
      />
      <Typography variant='body1' align='center'>
        {data}
      </Typography>
    </>
  );
};
