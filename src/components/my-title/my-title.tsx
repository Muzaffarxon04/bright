import { cn } from "@/lib/utils/cn";
import React from "react";

type MyTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const MyTitle = ({ children, className }: MyTitleProps) => {
  return (
    <p
      className={cn(
        "font-semibold md:text-[48px] md:leading-[56.35px] text-[24px] leading-[28.18px] text-center",
        className
      )}
    >
      {children}
    </p>
  );
};

export default MyTitle;
