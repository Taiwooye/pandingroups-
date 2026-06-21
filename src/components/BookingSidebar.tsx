"use client";

import { useState } from "react";
import Link from "next/link";

interface BookingSidebarProps {
  slug: string;
  service: "hotel" | "apartment";
  price: number;
  maxGuests: number;
  isAvailable: boolean;
  benefits: string[];
}

export default function BookingSidebar({ slug, service, price, maxGuests, isAvailable, benefits }: BookingSidebarProps) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const params = new URLSearchParams({ service, id: slug });
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  if (guests) params.set("guests", guests);
  const bookUrl = `/book?${params.toString()}`;

  const label = service === "hotel" ? "Reserve This Room" : "Reserve Apartment";

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-amber-700">₦{price.toLocaleString()}</span>
        <span className="text-slate-400 ml-2 text-sm">/ night</span>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-in</label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut("");
            }}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-out</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
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
        className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
          isAvailable
            ? "bg-[#5A0E24] text-white hover:bg-[#921224]"
            : "bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none"
        }`}
      >
        {isAvailable ? label : "Not Available"}
      </Link>
      <p className="text-center text-xs text-slate-400 mt-3">No charge until confirmation</p>

      <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}
