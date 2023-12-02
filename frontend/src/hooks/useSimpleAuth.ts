import axios from 'axios';
import { useEffect, useState } from 'react';

export const useSimpleAuth = (): [boolean, () => void, () => void] => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // TODO: refactor
    axios
      .get(`/api/me`)
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, [isLoggedIn]);

  return [isLoggedIn, () => setLoggedIn(true), () => setLoggedIn(false)];
};
