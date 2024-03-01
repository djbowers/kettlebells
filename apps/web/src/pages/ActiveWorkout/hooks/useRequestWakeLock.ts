import { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

export const useRequestWakeLock = () => {
  const { isSupported, release, released, request } = useWakeLock();
  const locked = released === false;

  const requestWakeLock = async () => {
    if (!isSupported) return;
    if (!locked) await request();
  };

  const releaseWakeLock = async () => {
    if (!isSupported) return;
    if (locked) await release();
  };

  useEffect(() => {
    requestWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, []);

  return requestWakeLock;
};
