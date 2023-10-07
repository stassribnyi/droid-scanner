import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

function tryParseUrl(url: string) {
  try {
    return new URL(url);
  } catch (err) {
    return null;
  }
}

function tryParseNumber(id: string | null) {
  if (!id) {
    return null;
  }
  try {
    return parseInt(id, 10);
  } catch (err) {
    return null;
  }
}

export const Scanner: React.FC<{
  onResult: (id: number) => void;
}> = ({ onResult }) => {
  const [data, setData] = useState('No result');

  useEffect(() => {
    const result = tryParseUrl(data);
    if (result) {
      const droidId = tryParseNumber(result.searchParams.get('droidId'));

      if (droidId) {
        onResult(droidId);
      }
    }
  }, [data, onResult]);

  return (
    <>
      <QrReader
        containerStyle={{
          position: 'absolute',
          top: '50%',
          right: 0,
          left: 0,
          bottom: 0,
          transform: "translateY(-50%)",
          maxHeight: '100vh'
        }}
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
