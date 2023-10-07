import { useState } from 'react';
import './App.css';

import { Scanner } from './Scanner';

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
      <div className='card'>
        <button
          onClick={() => {
            setIsOpen((open) => !open);
            setDroidUrl('');
          }}
        >
          Scan me!
        </button>
        {droidUrl && <img src={`/droid-scanner/${droidUrl}`} alt='' width='100%' height='100%' />}
      </div>
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
