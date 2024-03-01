import { Duration } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAUSED = false;
const TIME_FORMAT = 'm:ss';

export const useTimer = (
  /** Time to start counting down from in minutes */
  initialTimer: number,
  options: { defaultPaused?: boolean; timeFormat?: string } = {
    defaultPaused: DEFAULT_PAUSED,
    timeFormat: TIME_FORMAT,
  },
) => {
  const [milliseconds, setMilliseconds] = useState<number>(
    initialTimer * 60000,
  );
  const [paused, setPaused] = useState<boolean>(
    options?.defaultPaused || DEFAULT_PAUSED,
  );

  useEffect(() => {
    if (paused || initialTimer === 0) return;

    const timer = setInterval(() => {
      setMilliseconds((s) => s - 100);
    }, 100);
    return () => clearInterval(timer);
  }, [paused]);

  const reset = useCallback(
    (timer: number = initialTimer) => setMilliseconds(timer * 60000),
    [],
  );
  const pause = useCallback(() => setPaused(true), []);
  const play = useCallback(() => setPaused(false), []);

  const timeRemaining = Duration.fromObject({
    milliseconds,
  }).toFormat(options?.timeFormat || TIME_FORMAT);

  return [timeRemaining, { reset, milliseconds, pause, play, paused }] as const;
};
