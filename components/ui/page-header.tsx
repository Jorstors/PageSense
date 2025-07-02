import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/**
 * Consistent page header component with semantic heading structure
 * and optional description. Ensures proper heading hierarchy for SEO.
 */
export function PageHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1
        className={cn(
          "scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl",
          titleClassName
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn("text-lg text-muted-foreground", descriptionClassName)}
        >
          {description}
        </p>
      )}
    </div>
  );
}
