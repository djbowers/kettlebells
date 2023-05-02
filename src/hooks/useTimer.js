import { useCallback, useEffect, useState } from 'react';

import { Duration } from '~/utils';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetTimer = useCallback(() => setSeconds(0), []);

  const elapsedTime = Duration.fromObject({ seconds }).toFormat('m:s');

  return [elapsedTime, { resetTimer }];
};
