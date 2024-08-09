"use client";

import { usePathname } from "next/navigation";
import FooterContent from "./footer-content";
import { cn } from "@/lib/utils/cn";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className={cn("bg-white", { hidden: pathname.includes("auth") })}>
      <FooterContent />
    </footer>
  );
};

export default Footer;
