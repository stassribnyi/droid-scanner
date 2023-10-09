import { useEffect, useState } from 'react';
import { useDeviceUUID } from './useDeviceUUID';
import { isStringNullOrEmpty } from '../utils';

const STATUS = 'logged-in' as const

export const useSimpleAuth = (): [boolean, () => void] => {
  const deviceId = useDeviceUUID()
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (isStringNullOrEmpty(deviceId)) {
      return
    }

    if (isLoggedIn) {
      localStorage.setItem(deviceId, STATUS);

      return;
    }

    const status = localStorage.getItem(deviceId);

    if (isStringNullOrEmpty(status)) {
      setLoggedIn(false)

      return
    }

    setLoggedIn(status === STATUS)
  }, [deviceId, isLoggedIn]);

  return [isLoggedIn, () => setLoggedIn(true)];
};
