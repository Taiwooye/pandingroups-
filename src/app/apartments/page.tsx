"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import apartmentsData from "@/data/apartments.json";
import { Apartment } from "@/types";

const apartments = apartmentsData as Apartment[];
const types = ["All", "1-Bedroom", "2-Bedroom", "3-Bedroom", "4-Bedroom"] as const;

export default function ApartmentsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? apartments
    : apartments.filter((a) => a.type.toLowerCase() === active.toLowerCase());

  return (
    <div>
      <PageHero
        title="Serviced Apartments"
        subtitle="The comfort of home with the luxury of a five-star hotel. Perfect for extended stays, families, and corporate travelers."
        image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Apartments" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-10 p-4 bg-slate-50 rounded-xl">
            <span className="text-sm font-semibold text-slate-600 mr-2">Filter by:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === t
                    ? "bg-[#5A0E24] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                {t}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500">
              {filtered.length} {filtered.length === 1 ? "apartment" : "apartments"} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🏠</div>
              <p className="font-medium">No apartments in this category right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((apt) => (
                <div key={apt.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={apt.image} alt={apt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${apt.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {apt.available ? "Available" : "Booked"}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-[#5A0E24]/90 text-white capitalize">
                        {apt.type.replace(/-/g, " ")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{apt.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{apt.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                      {apt.bedrooms > 0 && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7h18" />
                          </svg>
                          {apt.bedrooms} {apt.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {apt.size} m&sup2;
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {apt.features.slice(0, 3).map((f) => (
                        <span key={f} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">{f}</span>
                      ))}
                      {apt.features.length > 3 && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">+{apt.features.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-2xl font-bold text-amber-700">&#8358;{apt.price.toLocaleString()}</span>
                        <span className="text-sm text-slate-400 ml-1">/ night</span>
                      </div>
                      <Link href={`/apartments/${apt.id}`} className="px-4 py-2 bg-[#5A0E24] text-white text-sm font-semibold rounded-lg hover:bg-[#921224] transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Facilities */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Included With Your Stay</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-2">Apartment Facilities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { icon: "🏊", title: "Swimming Pool", desc: "Outdoor pool for all guests" },
              { icon: "🎮", title: "Games Room", desc: "Pool, ping-pong & more" },
              { icon: "🏋️", title: "Fitness Center", desc: "Gym — coming soon" },
              { icon: "🏠", title: "Full Kitchen", desc: "Fully equipped kitchen" },
              { icon: "🛎️", title: "Concierge", desc: "24/7 personal service" },
              { icon: "🔑", title: "Key-Card Access", desc: "Secure entry system" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{f.icon}</div>
                <div className="font-bold text-slate-800 text-sm mb-0.5">{f.title}</div>
                <div className="text-xs text-slate-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🏠", title: "Home Comforts", desc: "Full kitchen, laundry, living areas" },
              { icon: "🛎️", title: "Hotel Services", desc: "Daily housekeeping & concierge" },
              { icon: "📅", title: "Flexible Terms", desc: "Daily, weekly, or monthly stays" },
              { icon: "🔑", title: "Secure & Private", desc: "Key-card access & 24/7 security" },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-5 text-center shadow-sm border border-slate-100">
                <div className="text-3xl mb-2">{b.icon}</div>
                <h3 className="font-bold text-slate-800 mb-1">{b.title}</h3>
                <p className="text-sm text-slate-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
