"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CardCarouselProps {
  images: string[];
  alt: string;
}

export default function CardCarousel({ images, alt }: CardCarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={i === 0 ? alt : `${alt} — photo ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {count > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-[2]">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setCurrent(i); }}
              aria-label={`Photo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-4 h-1.5" : "bg-white/50 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
