"use client";

import { useEffect } from "react";

// Full-screen "Coming Soon" overlay. Intentionally has no close control.
export default function ComingSoonOverlay() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Coming soon"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-wine-deep/60 backdrop-blur-[2px] px-4"
    >
      <div className="text-center">
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-semibold text-gold-gradient drop-shadow-lg">
          Coming Soon
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-cream/90 tracking-[0.3em] uppercase">
          PaNDiN Group
        </p>
      </div>
    </div>
  );
}
