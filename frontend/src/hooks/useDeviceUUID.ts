import { useEffect, useState } from 'react';

const DEVICE_UUID = 'DeviceUUID' as const;

const isEmpty = (value: string | null | undefined): value is null => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value !== 'string') {
    return true;
  }

  if (value.trim().length === 0) {
    return true;
  }

  return false;
};

const getDeviceUUID = () => {
  const uuid = localStorage.getItem(DEVICE_UUID);

  if (!isEmpty(uuid)) {
    return uuid;
  }

  const randomUUID = crypto.randomUUID();
  localStorage.setItem(DEVICE_UUID, randomUUID);

  return randomUUID;
};

export const useDeviceUUID = () => {
  const [deviceUUID, setDeviceUUID] = useState('');

  useEffect(() => {
    if (!isEmpty(deviceUUID)) {
      return;
    }

    setDeviceUUID(getDeviceUUID());
  }, [deviceUUID]);

  return deviceUUID;
};
