import { RefObject, useEffect } from "react";

export const useClickOutside = (
  elRef: RefObject<HTMLElement>,
  setState: (value: boolean) => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (elRef.current && !elRef.current.contains(event.target as Node)) {
      setState(false);
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};
