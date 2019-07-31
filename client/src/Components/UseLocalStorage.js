import { useState } from "react";

export const UseLocalStorage = (key, initialValue) => {
  if (typeof key !== "string")
    throw new Error("Invalid parameters: UseLocalStorage(key, value)");

  const [storedValue, setStoredValue] = useState(() => {
    console.log(`UseLocalStorage:useState`);
    const item = localStorage.getItem(key);
    console.log(`useLocalStorage:useState`, key, initialValue, item);
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = value => {
    setStoredValue(value);
    console.log(`UseLocalStorage:useState:`, value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};