import { useAsyncStorage as useNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const useAsyncStorage = (key, onLoadValue) => {
  const { getItem, setItem, removeItem } = useNativeAsyncStorage(key);

  const readValueFromStorage = async () => {
    const item = await getItem();
    return JSON.parse(item);
  };

  const writeValueToStorage = async (newOption) => {
    const item = JSON.stringify(newOption);
    await setItem(item);
  };

  const removeItemFromStorage = async () => {
    await removeItem();
  };

  useEffect(() => {
    // removeItemFromStorage();  // uncomment to clear async storage
    const loadStoredValue = async () => {
      const storedValue = await readValueFromStorage();
      if (storedValue) onLoadValue(storedValue);
    };
    loadStoredValue();
  }, []);

  return [writeValueToStorage, removeItemFromStorage];
};
