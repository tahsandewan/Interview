import { useRef } from "react";

const useDebounce = (callback, delay) => {
  const timer = useRef();

  const debouncedFunction = (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFunction;
};

export default useDebounce;
