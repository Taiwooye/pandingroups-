"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
}

const HIGHLIGHTS = [
  { icon: "🏊", label: "Swimming Pool" },
  { icon: "🍸", label: "DarNis Lounge" },
  { icon: "🎉", label: "Event Hall · 500 guests" },
  { icon: "🛎️", label: "24/7 Concierge" },
];

const SLIDE_INTERVAL = 8000;

// YYYY-MM-DD in the visitor's local time zone, as used by <input type="date">
function toDateInput(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return toDateInput(new Date(y, m - 1, d + days));
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [errored, setErrored] = useState<boolean[]>(images.map(() => false));
  const [booking, setBooking] = useState({ service: "hotel", checkIn: "", checkOut: "", guests: "2" });

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length, current]);

  const validImages = images.filter((_, i) => !errored[i]);
  const today = toDateInput(new Date());
  const minCheckOut = addDays(booking.checkIn || today, 1);

  const updateBooking = (name: string, value: string) => {
    setBooking((b) => {
      const next = { ...b, [name]: value };
      if (name === "checkIn" && next.checkOut && value && next.checkOut <= value) next.checkOut = "";
      return next;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ service: booking.service, guests: booking.guests });
    if (booking.checkIn) params.set("checkIn", booking.checkIn);
    if (booking.checkOut) params.set("checkOut", booking.checkOut);
    router.push(`/book?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-wine-deep">
      {/* Background images — crossfade with slow zoom */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === current ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== current}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            className={`object-cover ${i === current ? "animate-ken-burns" : ""}`}
            priority={i === 0}
            onError={() => {
              setErrored((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }}
          />
        </div>
      ))}

      {/* Wine gradient overlays */}
      <div className="absolute inset-0 bg-wine-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/95 via-wine/80 to-wine-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/20 to-wine-deep/60" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-7">
            <div className="hero-enter flex items-center gap-3 mb-6" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold-light text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase">
                Welcome to PaNDiN Group
              </span>
            </div>

            <h1
              className="hero-enter font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6"
              style={{ "--enter-delay": "250ms" } as React.CSSProperties}
            >
              Where Luxury
              <span className="block italic text-gold-gradient pb-2">Meets Comfort</span>
            </h1>

            <p
              className="hero-enter text-lg text-white/75 mb-8 leading-relaxed max-w-xl"
              style={{ "--enter-delay": "400ms" } as React.CSSProperties}
            >
              Experience an unparalleled level of hospitality in our world-class hotel, serviced apartments, and exclusive event spaces in the heart of Ibadan.
            </p>

            <div className="hero-enter flex flex-wrap gap-4 mb-8" style={{ "--enter-delay": "550ms" } as React.CSSProperties}>
              <Link href="/hotel" className="btn-gold px-7 py-3.5 font-semibold rounded-full shadow-lg">
                Explore Rooms
              </Link>
              <Link
                href="/event-hall"
                className="px-7 py-3.5 text-white font-semibold rounded-full border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-gold-light transition-colors"
              >
                Plan an Event
              </Link>
            </div>

            {/* Highlights */}
            <div className="hero-enter flex flex-wrap gap-2.5" style={{ "--enter-delay": "700ms" } as React.CSSProperties}>
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-white/85 text-xs sm:text-sm"
                >
                  <span aria-hidden>{h.icon}</span>
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          {/* Side card */}
          <div className="hidden lg:block lg:col-span-5">
            <div
              className="hero-enter relative ml-auto max-w-sm rounded-3xl p-7 bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl"
              style={{ "--enter-delay": "650ms" } as React.CSSProperties}
            >
              <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-gold-gradient opacity-30 blur-2xl" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-gold" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="ml-2 text-white/80 text-sm">Loved by 50K+ guests</span>
              </div>
              <p className="font-serif text-2xl text-white leading-snug mb-5">
                Hotel rooms, apartments, events &amp; nightlife — all under one roof.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { value: "30", label: "Rooms" },
                  { value: "500", label: "Event guests" },
                  { value: "24/7", label: "Service" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-wine-deep/40 border border-white/10 py-3">
                    <div className="font-serif text-xl text-gold-light">{s.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/60 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-5">Iyana Church, Off Iwo Road, Ibadan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick booking bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
        <form
          onSubmit={handleSearch}
          className="hero-enter grid grid-cols-2 md:grid-cols-5 gap-3 p-4 md:p-5 rounded-3xl bg-white/95 backdrop-blur shadow-2xl border border-gold/30"
          style={{ "--enter-delay": "850ms" } as React.CSSProperties}
        >
          <label className="col-span-2 md:col-span-1 flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark mb-1">Stay</span>
            <select
              value={booking.service}
              onChange={(e) => updateBooking("service", e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <option value="hotel">Hotel Room</option>
              <option value="apartment">Apartment</option>
            </select>
          </label>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark mb-1">Check-in</span>
            <DatePicker
              value={booking.checkIn}
              onChange={(v) => updateBooking("checkIn", v)}
              min={today}
              placeholder="Add date"
              rangeStart={booking.checkIn}
              rangeEnd={booking.checkOut}
              placement="top"
              ariaLabel="Check-in date"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark mb-1">Check-out</span>
            <DatePicker
              value={booking.checkOut}
              onChange={(v) => updateBooking("checkOut", v)}
              min={minCheckOut}
              placeholder="Add date"
              rangeStart={booking.checkIn}
              rangeEnd={booking.checkOut}
              placement="top"
              ariaLabel="Check-out date"
            />
          </div>
          <label className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark mb-1">Guests</span>
            <select
              value={booking.guests}
              onChange={(e) => updateBooking("guests", e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button type="submit" className="btn-wine w-full py-3 rounded-xl font-semibold text-sm">
              Check Availability
            </button>
          </div>
        </form>

        {/* Slide indicators */}
        {validImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, i) =>
              errored[i] ? null : (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-gold" : "w-4 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
