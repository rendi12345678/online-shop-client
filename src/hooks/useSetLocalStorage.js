import {useState, useEffect} from "react";

export const useSetLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key) || initialValue
  })
  
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  
  return [value, setValue];
}