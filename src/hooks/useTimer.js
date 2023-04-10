import { useEffect } from 'react';
import { useState } from 'react';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, []);

  return seconds;
};
