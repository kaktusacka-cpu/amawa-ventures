"use client";

import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Reset to top instantly, then smooth scroll to target
    window.scrollTo({ top: 0, behavior: "instant" });

    const timeout = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
