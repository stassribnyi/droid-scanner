import { useEffect, useState } from 'react';
import { isStringNullOrEmpty } from '../utils';

const DEVICE_UUID = 'DeviceUUID' as const;

const getDeviceUUID = () => {
  const uuid = localStorage.getItem(DEVICE_UUID);

  if (!isStringNullOrEmpty(uuid)) {
    return uuid;
  }

  const randomUUID = crypto.randomUUID();
  localStorage.setItem(DEVICE_UUID, randomUUID);

  return randomUUID;
};

export const useDeviceUUID = () => {
  const [deviceUUID, setDeviceUUID] = useState('');

  useEffect(() => {
    if (!isStringNullOrEmpty(deviceUUID)) {
      return;
    }

    setDeviceUUID(getDeviceUUID());
  }, [deviceUUID]);

  return deviceUUID;
};
