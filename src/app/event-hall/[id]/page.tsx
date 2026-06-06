import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import hallsData from "@/data/event-halls.json";
import { EventHall } from "@/types";

const halls = hallsData as EventHall[];

export async function generateStaticParams() {
  return halls.map((h) => ({ id: h.id }));
}

export async function generateMetadata(props: PageProps<"/event-hall/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const hall = halls.find((h) => h.id === id);
  if (!hall) return {};
  return { title: hall.name, description: hall.description };
}

export default async function EventHallDetailPage(props: PageProps<"/event-hall/[id]">) {
  const { id } = await props.params;
  const hall = halls.find((h) => h.id === id);
  if (!hall) notFound();

  const related = halls.filter((h) => h.id !== hall.id).slice(0, 2);

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={hall.image} alt={hall.name} fill className="object-cover" priority />
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
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${hall.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {hall.available ? "✓ Available for Booking" : "✗ Currently Booked"}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">About This Venue</h2>
              <p className="text-slate-600 leading-relaxed">{hall.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Max Capacity", value: `${hall.capacity} guests`, icon: "👥" },
                { label: "Floor Space", value: `${hall.size} m²`, icon: "📐" },
                { label: "Price", value: `₦${hall.price.toLocaleString()}/day`, icon: "💰" },
              ].map((d) => (
                <div key={d.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-bold text-slate-800 text-sm">{d.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>

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

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Suitable For</h2>
              <div className="flex flex-wrap gap-2">
                {hall.suitable.map((s) => (
                  <span key={s} className="px-4 py-2 bg-amber-50 text-amber-700 text-sm rounded-full font-medium border border-amber-100">{s}</span>
                ))}
              </div>
            </div>

            {hall.gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hall.gallery.map((img, i) => (
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
                <span className="text-4xl font-bold text-amber-700">₦{hall.price.toLocaleString()}</span>
                <span className="text-slate-400 ml-2 text-sm">/ day</span>
              </div>
              <Link
                href={`/book?service=event-hall&room=${encodeURIComponent(hall.name)}`}
                className={`flex items-center justify-center w-full py-3.5 rounded-xl font-semibold text-sm transition-colors ${hall.available ? "bg-[#C41230] text-white hover:bg-[#9C0E25]" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
              >
                {hall.available ? "Book Now" : "Not Available"}
              </Link>
              <p className="text-center text-xs text-slate-400 mt-3">Our team will respond within 2 hours</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Other Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 mb-1">{r.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-sm">Up to {r.capacity} guests</span>
                      <Link href={`/event-hall/${r.id}`} className="text-amber-600 text-sm font-semibold hover:text-amber-700">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
