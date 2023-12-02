import { useEffect, useState } from 'react';
import { useDeviceUUID } from './useDeviceUUID';
import axios from 'axios';

const STATUS = 'logged-in' as const;

export const useSimpleAuth = (): [boolean, () => void, () => void] => {
  const deviceId = useDeviceUUID();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    if (isLoggedIn) {
      localStorage.setItem(deviceId, STATUS);

      return;
    }

    const status = localStorage.getItem(deviceId);

    if (!status) {
      setLoggedIn(false);

      return;
    }

    // TODO: refactor
    axios
      .get(`/api/users/${deviceId}`)
      .then(() => {
        setLoggedIn(status === STATUS);
      })
      .catch(() => {
        localStorage.removeItem(deviceId);
        setLoggedIn(false);
      });
  }, [deviceId, isLoggedIn]);

  return [
    isLoggedIn,
    () => setLoggedIn(true),
    () => {
      localStorage.removeItem(deviceId);

      setLoggedIn(false);
    },
  ];
};
