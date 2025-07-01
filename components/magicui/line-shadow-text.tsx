"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface LineShadowTextProps extends HTMLMotionProps<"span"> {
  shadowColor?: string;
  className?: string;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  ...props
}: LineShadowTextProps) {
  if (typeof children !== "string") {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <motion.span
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.02em] after:top-[0.02em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_35%,var(--shadow-color)_45%,var(--shadow-color)_65%,transparent_75%)]",
        "after:-z-10 after:bg-[length:0.03em_0.03em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      )}
      data-text={children}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
