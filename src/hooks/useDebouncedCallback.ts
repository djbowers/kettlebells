import { useEffect, useState } from 'react';

export function useDebouncedCallback<T>(
  callback: (value: T) => void,
  delay: number = 500,
) {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== undefined) callback(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return setValue;
}
