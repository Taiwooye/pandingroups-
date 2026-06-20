import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as venuesApi from "@/services/endpoints/venues";
import { ApiVenue } from "@/types";

const FALLBACK_IMAGE = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-1.jpg";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/event-hall/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  try {
    const result = await venuesApi.getBySlug(id);
    const hall: ApiVenue = result.data;
    return { title: hall.name, description: hall.description };
  } catch {
    return {};
  }
}

export default async function EventHallDetailPage(props: PageProps<"/event-hall/[id]">) {
  const { id } = await props.params;

  let hall: ApiVenue;
  try {
    const result = await venuesApi.getBySlug(id);
    hall = result.data;
    if (!hall) notFound();
  } catch {
    notFound();
  }

  const heroImage = hall.media[0]?.url ?? hall.media[1]?.url ?? FALLBACK_IMAGE;
  const gallery = hall.media.slice(0, 5).map((m) => m.url);
  const price = parseFloat(hall.price_per_day);
  const isAvailable = hall.status.value === "available";

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={heroImage} alt={hall.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/" className="text-amber-300 hover:text-amber-200">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/event-hall" className="text-amber-300 hover:text-amber-200">Event Hall</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{hall.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{hall.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {isAvailable ? "✓ Available for Booking" : "✗ Currently Booked"}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">About This Venue</h2>
              <p className="text-slate-600 leading-relaxed">{hall.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Max Capacity", value: `${hall.max_capacity} guests`, icon: "👥" },
                { label: "Min Capacity", value: `${hall.min_capacity} guests`, icon: "👤" },
                { label: "Floor Space", value: `${hall.floor_space_sqm} m²`, icon: "📐" },
                { label: "Price", value: `₦${price.toLocaleString()}/day`, icon: "💰" },
              ].map((d) => (
                <div key={d.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-bold text-slate-800 text-sm">{d.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>

            {hall.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Venue Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {hall.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hall.event_types?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Suitable For</h2>
                <div className="flex flex-wrap gap-2">
                  {hall.event_types.map((s) => (
                    <span key={s} className="px-4 py-2 bg-amber-50 text-amber-700 text-sm rounded-full font-medium border border-amber-100">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${hall.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
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
                <span className="text-4xl font-bold text-amber-700">₦{price.toLocaleString()}</span>
                <span className="text-slate-400 ml-2 text-sm">/ day</span>
              </div>
              <Link
                href={`/book?service=event-hall&room=${encodeURIComponent(hall.name)}`}
                className={`flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-colors ${isAvailable ? "bg-[#5A0E24] text-white hover:bg-[#921224]" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
              >
                {isAvailable ? "Book Now" : "Not Available"}
              </Link>
              <p className="text-center text-xs text-slate-400 mt-3">Our team will respond within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
