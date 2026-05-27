"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import galleryData from "@/data/gallery.json";
import { GalleryImage } from "@/types";

const images = galleryData as GalleryImage[];
const categories = ["all", "hotel", "apartments", "events", "dining", "lounge", "exterior"] as const;

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    if (active === null) return;
    setActive((active - 1 + filtered.length) % filtered.length);
  }, [active, filtered.length]);

  const next = useCallback(() => {
    if (active === null) return;
    setActive((active + 1) % filtered.length);
  }, [active, filtered.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <div>
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through the elegance and luxury of PandinGroups."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        height="sm"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setActive(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer capitalize transition-colors ${
                  filter === cat
                    ? "bg-[#C41230] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setActive(idx)}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  idx % 7 === 0 || idx % 7 === 4 ? "col-span-2 row-span-2 h-80" : "h-48"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <p className="text-white text-xs font-medium">{img.alt}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#C41230]/80 text-white text-xs rounded-full capitalize">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-8 aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[active].src}
              alt={filtered[active].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white font-medium text-sm">{filtered[active].alt}</p>
            <p className="text-white/50 text-xs mt-1">{active + 1} / {filtered.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
