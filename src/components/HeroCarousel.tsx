"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  {
    src: "/images/hero-1.jpg",
    alt: "PaNDiN Group – Courtyard and building exterior",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "PaNDiN Group – Hotel entrance and signage",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "PaNDiN Group – Hotel lobby and reception entrance",
  },
];

const INTERVAL_MS = 20000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % IMAGES.length);
        setFading(false);
      }, 600);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  function goTo(index: number) {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 600);
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Image layers */}
      {IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? (fading ? 0 : 1) : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/10 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-[#5A0E24]/90 text-white text-sm font-semibold rounded-full mb-5 tracking-wide uppercase">
            Welcome to PaNDiN Group
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Where Luxury
            <span className="block text-amber-400">Meets Comfort</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Experience an unparalleled level of hospitality in our world-class hotel, serviced apartments, and exclusive event spaces in the heart of Ibadan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/hotel"
              className="px-6 py-3 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors shadow-lg"
            >
              Explore Rooms
            </Link>
            <Link
              href="/book"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
