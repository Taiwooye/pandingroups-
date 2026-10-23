"use client";

import { useState } from "react";
import Link from "next/link";
import DatePicker from "./DatePicker";

interface BookingSidebarProps {
  slug: string;
  service: "hotel" | "apartment";
  price: number;
  maxGuests: number;
  isAvailable: boolean;
  benefits: string[];
}

export default function BookingSidebar({ slug, service, price, maxGuests, isAvailable, benefits }: BookingSidebarProps) {
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const checkInDate = checkIn || today;
  const [y, m, day] = checkInDate.split("-").map(Number);
  const next = new Date(y, m - 1, day + 1);
  const minCheckOut = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;

  const params = new URLSearchParams({ service, id: slug });
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const bookUrl = `/book?${params.toString()}`;

  const label = service === "hotel" ? "Reserve This Room" : "Reserve Apartment";

  return (
    <div className="sticky top-24 rounded-3xl p-px bg-gradient-to-br from-gold-light via-gold/40 to-gold-dark shadow-[0_30px_60px_-30px_rgba(61,8,24,0.45)]">
     <div className="rounded-[calc(1.5rem-1px)] bg-white p-6">
      <div className="text-center mb-6 pb-6 border-b border-cream-dark">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">From</span>
        <div className="mt-1">
          <span className="font-serif text-4xl font-semibold text-wine">₦{price.toLocaleString()}</span>
          <span className="text-slate-400 ml-2 text-sm">/ night</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block mb-1">Check-in</span>
          <DatePicker
            value={checkIn}
            min={today}
            onChange={(v) => {
              setCheckIn(v);
              if (checkOut && v && v >= checkOut) setCheckOut("");
            }}
            rangeStart={checkIn}
            rangeEnd={checkOut}
            placeholder="Add date"
            ariaLabel="Check-in date"
          />
        </div>
        <div>
          <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block mb-1">Check-out</span>
          <DatePicker
            value={checkOut}
            min={minCheckOut}
            onChange={setCheckOut}
            rangeStart={checkIn}
            rangeEnd={checkOut}
            placeholder="Add date"
            ariaLabel="Check-out date"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gold-dark uppercase tracking-wider block mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white"
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1} {i === 0 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Link
        href={isAvailable ? bookUrl : "#"}
        className={`flex items-center justify-center w-full py-3.5 rounded-full font-semibold text-sm ${
          isAvailable
            ? "btn-gold shadow-md"
            : "bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none"
        }`}
      >
        {isAvailable ? label : "Not Available"}
      </Link>
      <p className="text-center text-xs text-slate-400 mt-3">No charge until confirmation</p>

      <div className="mt-6 pt-6 border-t border-cream-dark space-y-2.5">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {b}
          </div>
        ))}
      </div>
     </div>
    </div>
  );
}
