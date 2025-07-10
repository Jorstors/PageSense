import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  className?: string;
  headingClassName?: string;
  subheadingClassName?: string;
}

/**
 * Consistent page header component with semantic heading structure
 * and optional subheading. Ensures proper heading hierarchy for SEO.
 */
export function PageHeader({
  heading,
  subheading,
  className,
  headingClassName,
  subheadingClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("relative space-y-2 pb-6 border-b border-border/40", className)}>
      <h1
        className={cn(
          "scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
          headingClassName
        )}
      >
        {heading}
      </h1>
      {subheading && (
        <p
          className={cn("text-muted-foreground", subheadingClassName)}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
