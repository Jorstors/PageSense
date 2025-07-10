"use client";

import { TextAnimate } from "../magicui/text-animate";

export function AuditTitle() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full container px-14 pb-10 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Website Analysis
          </span>
        </h1>
        <TextAnimate as="p" className="mt-4 text-lg text-muted-foreground">
          Enter your website URL below, and let our AI uncover potential
          conversion blockers effortlessly.
        </TextAnimate>
      </div>
    </div>
  );
}
