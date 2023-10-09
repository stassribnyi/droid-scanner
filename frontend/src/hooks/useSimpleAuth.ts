import { useEffect, useState } from 'react';
import { useDeviceUUID } from './useDeviceUUID';

const STATUS = 'logged-in' as const

export const useSimpleAuth = (): [boolean, () => void] => {
  const deviceId = useDeviceUUID()
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!deviceId) {
      return
    }

    if (isLoggedIn) {
      localStorage.setItem(deviceId, STATUS);

      return;
    }

    const status = localStorage.getItem(deviceId);

    if (!status) {
      setLoggedIn(false)

      return
    }

    setLoggedIn(status === STATUS)
  }, [deviceId, isLoggedIn]);

  return [isLoggedIn, () => setLoggedIn(true)];
};
