import { Duration } from '~/utils';

export const useTimer = () => {
  const seconds = 445;
  const elapsedTime = Duration.fromObject({ seconds }).toFormat('m:ss');
  return [elapsedTime, { seconds, resetTimer: () => {} }];
};
