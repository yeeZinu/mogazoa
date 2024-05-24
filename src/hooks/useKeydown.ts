import { useEffect } from "react";

const useKeydown = (key: string, callback: () => void) => {
  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown);

    return () => document.removeEventListener("keydown", handleEscapeKeyDown);
  }, [key, callback]);
};

export default useKeydown;
