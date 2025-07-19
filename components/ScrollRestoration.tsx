"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position when pathname changes
    window.scrollTo(0, 0);

    // If there's a ScrollArea element with the .scrollToTop class, reset its scroll position
    const scrollAreas = document.querySelectorAll('.scrollToTop');
    scrollAreas.forEach(scrollArea => {
      const viewport = scrollArea.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
}
