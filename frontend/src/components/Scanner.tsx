import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import QrScanner from 'qr-scanner';

const QrStream: FC<{
  onDecode: (result: QrScanner.ScanResult) => void;
  onError: (error: string | Error) => void;
}> = memo(function Video({ onDecode, onError }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video.current) {
      return;
    }

    const qrScanner = new QrScanner(video.current, onDecode, {
      highlightScanRegion: true,
      highlightCodeOutline: true,
      preferredCamera: 'environment',
      onDecodeError: onError
    });

    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    }
  }, [video.current]);

  return <Box component='video' ref={video} sx={{
    width: "100%",
    objectFit: 'cover',
    aspectRatio: '1/1'
  }} />
})

export const Scanner: React.FC<{
  onResult: (data?: string) => void;
}> = ({ onResult }) => {
  const [error, setError] = useState('Please align with QR code');

  const handleScan = useCallback((result: QrScanner.ScanResult) => {
    if (!result.data) {
      return;
    }

    onResult(result.data);
  }, [onResult])

  const handleError = useCallback((decodeError: string | Error) => {
    setError(typeof decodeError === 'string' ? decodeError : decodeError.message);
  }, [setError])

  return (
    <Box>
      <QrStream onDecode={handleScan} onError={handleError} />
      <Typography variant='body1' align='center'>
        {error}
      </Typography>
    </Box>
  );
};
