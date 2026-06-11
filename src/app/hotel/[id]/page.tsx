import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import roomsData from "@/data/hotel-rooms.json";
import { Room } from "@/types";

const rooms = roomsData as Room[];

export async function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export async function generateMetadata(props: PageProps<"/hotel/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const room = rooms.find((r) => r.id === id);
  if (!room) return {};
  return {
    title: room.name,
    description: room.description,
  };
}

export default async function HotelRoomPage(props: PageProps<"/hotel/[id]">) {
  const { id } = await props.params;
  const room = rooms.find((r) => r.id === id);

  if (!room) notFound();

  const related = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div className="mt-16 md:mt-20">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={room.image} alt={room.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/" className="text-amber-300 hover:text-amber-200">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/hotel" className="text-amber-300 hover:text-amber-200">Hotel</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{room.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{room.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status & Category */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${room.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {room.available ? "✓ Available" : "✗ Currently Booked"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 capitalize">{room.category}</span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">About This Room</h2>
              <p className="text-slate-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Capacity", value: `${room.capacity} guests`, icon: "👥" },
                { label: "Room Size", value: `${room.size} m²`, icon: "📐" },
                { label: "Category", value: room.category, icon: "⭐" },
              ].map((d) => (
                <div key={d.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-bold text-slate-800 capitalize">{d.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Room Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">In-Room Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((a) => (
                  <span key={a} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-800">Guest Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="font-semibold text-[#5A0E24] text-sm mb-1">Cancellation</p>
                  <p className="text-xs text-slate-500 leading-relaxed">25% cancellation fee applies. Refund within 72 hours via original payment method.</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="font-semibold text-amber-600 text-sm mb-1">Refund</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Processed via original payment method. Allow 48–72 hours to reflect.</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="font-semibold text-slate-700 text-sm mb-1">Damage</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Charges apply for damage to linen, key cards, remotes, and walls. <Link href="/policies" className="text-[#5A0E24] hover:underline">View full schedule</Link>.</p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            {room.gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${room.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-amber-700">₦{room.price.toLocaleString()}</span>
                <span className="text-slate-400 ml-2 text-sm">/ night</span>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-in</label>
                  <input type="date" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-out</label>
                  <input type="date" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Guests</label>
                  <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white">
                    {Array.from({ length: room.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Link
                href={`/book?service=hotel&id=${room.id}`}
                className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                  room.available
                    ? "bg-[#5A0E24] text-white hover:bg-[#921224]"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none"
                }`}
              >
                {room.available ? "Reserve This Room" : "Not Available"}
              </Link>

              <p className="text-center text-xs text-slate-400 mt-3">No charge until confirmation</p>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  25% cancellation fee applies
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complimentary breakfast
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  24/7 room service
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Rooms */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Other Rooms You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-1">{r.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 font-bold">₦{r.price.toLocaleString()}<span className="text-slate-400 text-xs font-normal">/night</span></span>
                    <Link href={`/hotel/${r.id}`} className="text-amber-600 text-sm font-semibold hover:text-amber-700">View →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
