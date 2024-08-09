import { useEffect } from "react";

export const useScrollFixed = (isFixed: boolean | string) => {
  useEffect(() => {
    if (isFixed) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.top = `-${scrollY}px`;
    }
    if (!isFixed) {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isFixed]);
};
