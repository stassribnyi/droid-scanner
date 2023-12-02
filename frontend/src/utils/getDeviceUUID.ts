const DEVICE_UUID = 'DeviceUUID' as const;
// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
//     .replace(/[xy]/g, function (c) {
//       const r = Math.random() * 16 | 0,
//         v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
// }

export const getDeviceUUID = () => {
  const uuid = localStorage.getItem(DEVICE_UUID);

  if (uuid) {
    return uuid;
  }

  const randomUUID = crypto.randomUUID();
  localStorage.setItem(DEVICE_UUID, randomUUID);

  return randomUUID;
};
