import { cn } from "@/lib/utils/cn";
import React from "react";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn("animate-pulse bg-neutral-400", className)} />;
};

export default Skeleton;
