import { useEffect, useState } from 'react';

const CURRENT_DROID_ID = 'CURRENT_DROID_ID';

export const useHintDroidId = (): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(CURRENT_DROID_ID) || '');

  useEffect(() => {
    localStorage.setItem(CURRENT_DROID_ID, value);
  }, [value]);

  return [value, setValue];
};
