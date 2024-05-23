import { useEffect } from "react";

const useEscapeKeydown = (callback: () => void) => {
  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown);

    return () => document.removeEventListener("keydown", handleEscapeKeyDown);
  }, [callback]);
};

export default useEscapeKeydown;
