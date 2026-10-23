"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Elements that fade up as they scroll into view on every page
const SELECTOR = "main h2, main .card-luxe, main section .grid > *";

// Adds the scroll-reveal animation to content below the fold, so pages
// that don't use <Reveal> directly still animate in.
export default function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) =>
        !el.closest(".reveal") &&
        !el.querySelector(".reveal") &&
        el.getBoundingClientRect().top > window.innerHeight
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      // Stagger siblings in the same grid
      const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty("--reveal-delay", `${(index % 4) * 100}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
