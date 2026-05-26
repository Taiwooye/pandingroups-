"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import roomsData from "@/data/hotel-rooms.json";
import { Room } from "@/types";

const rooms = roomsData as Room[];
const categories = ["All", "Standard", "Deluxe", "Suite", "Penthouse"] as const;

export default function HotelPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? rooms
    : rooms.filter((r) => r.category.toLowerCase() === active.toLowerCase());

  return (
    <div>
      <PageHero
        title="Hotel Rooms & Suites"
        subtitle="Discover our curated collection of luxurious accommodations, each designed to deliver comfort and elegance."
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Hotel" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-10 p-4 bg-slate-50 rounded-xl">
            <span className="text-sm font-semibold text-slate-600 mr-2">Filter by:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-[#7B2D3A] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500">
              {filtered.length} {filtered.length === 1 ? "room" : "rooms"} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🛏️</div>
              <p className="font-medium">No rooms in this category right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room) => (
                <RoomCard key={room.id} room={room} basePath="/hotel" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Facilities */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Included With Your Stay</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-2">Hotel Facilities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { icon: "🏊", title: "Swimming Pool", desc: "Outdoor heated pool" },
              { icon: "🎮", title: "Games Room", desc: "Pool, ping-pong & more" },
              { icon: "🏋️", title: "Fitness Center", desc: "24-hour gym access" },
              { icon: "💆", title: "Spa & Sauna", desc: "Full-service wellness" },
              { icon: "🍽️", title: "Restaurant", desc: "Fine dining on-site" },
              { icon: "🚗", title: "Free Parking", desc: "Secure valet parking" },
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

      {/* Info Banner */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Need Help Choosing?</h2>
          <p className="text-slate-500 mb-6">Our hospitality team is available 24/7 to help you find the perfect room for your stay.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2341234567890" className="px-6 py-3 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors">
              Call Us Now
            </a>
            <a href="/contact" className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl border border-sky-200 hover:bg-sky-50 transition-colors">
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
