import { useEffect, useState } from 'react';

const DEVICE_UUID = 'DeviceUUID' as const;

const getDeviceUUID = () => {
  const uuid = localStorage.getItem(DEVICE_UUID);

  if (uuid) {
    return uuid;
  }

  const randomUUID = crypto.randomUUID();
  localStorage.setItem(DEVICE_UUID, randomUUID);

  return randomUUID;
};

export const useDeviceUUID = () => {
  const [deviceUUID, setDeviceUUID] = useState('');

  useEffect(() => {
    if (deviceUUID) {
      return;
    }

    setDeviceUUID(getDeviceUUID());
  }, [deviceUUID]);

  return deviceUUID;
};
