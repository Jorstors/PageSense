"use client";

import React from "react";
import { DockIcon as BaseDockIcon, DockIconProps } from "./dock";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface EnhancedDockIconProps extends Omit<DockIconProps, "children"> {
  active?: boolean;
  label?: string;
  icon: React.ReactNode;
}

export const EnhancedDockIcon = ({
  active = false,
  label,
  icon,
  className,
  ...props
}: EnhancedDockIconProps) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <BaseDockIcon
          className={cn(
            "transition-all duration-300",
            {
              "bg-primary/15 shadow-sm": active,
            },
            className
          )}
          {...props}
        >
          {icon}
        </BaseDockIcon>
      </motion.div>
      {label && (
        <motion.span
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: 0,
            opacity: active ? 1 : 0.7,
          }}
          transition={{ duration: 0.2 }}
          className={cn("text-xs mt-1 transition-all duration-300", {
            "text-primary font-medium": active,
            "text-muted-foreground": !active
          })}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};
