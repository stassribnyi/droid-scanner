import { useState } from 'react';

import { Scanner } from './Scanner';
import { Button } from '@mui/material';

function getDroidById(id: number) {
  switch (id) {
    case 125:
      return 'c3po.png';
    case 225:
      return 'r2d2.jpg';
    case 325:
      return 'r3s6.webp';
    default:
      return '';
  }
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [droidUrl, setDroidUrl] = useState('');

  function showDroid(id: number) {
    if (id) {
      setDroidUrl(getDroidById(id));
    }
  }

  return (
    <>
      <Button
        variant='contained'
        onClick={() => {
          setIsOpen((open) => !open);
          setDroidUrl('');
        }}
      >
        Scan me!
      </Button>
      {droidUrl && (
        <img
          src={`/droid-scanner/${droidUrl}`}
          alt=''
          width='100%'
          height='100%'
        />
      )}
      {isOpen && (
        <Scanner
          onResult={(id) => {
            showDroid(id);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}

export default App;
