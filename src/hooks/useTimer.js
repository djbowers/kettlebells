import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetTimer = useCallback(() => setSeconds(0), []);

  return [seconds, { resetTimer }];
};
