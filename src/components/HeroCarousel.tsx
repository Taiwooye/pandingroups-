"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(images.map(() => false));
  const [errored, setErrored] = useState<boolean[]>(images.map(() => false));

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(id);
  }, [images.length]);

  const validImages = images.filter((_, i) => !errored[i]);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background images — crossfade */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== current}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            onLoad={() =>
              setLoaded((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              })
            }
            onError={() => {
              setErrored((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
              // advance to next if current image errors
              setCurrent((prev) => (prev + 1) % images.length);
            }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/20" />

      {/* Fixed content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
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

      {/* Slide indicators */}
      {validImages.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) =>
            errored[i] ? null : (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-amber-400" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            )
          )}
        </div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
