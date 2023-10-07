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
        // containerStyle={{
        //   position: 'absolute',
        //   top: '50%',
        //   right: 0,
        //   left: 0,
        //   bottom: 0,
        //   transform: 'translateY(-50%)',
        //   maxHeight: '100vh',
        // }}
        constraints={{
          facingMode: 'environment',
        }}
        onResult={(result, error) => {
          if (result) {
            setData(result?.getText());
          }

          if (error) {
            setData(error.message);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
};
