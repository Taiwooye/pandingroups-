import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import apartmentsData from "@/data/apartments.json";
import { Apartment } from "@/types";

const apartments = apartmentsData as Apartment[];

export async function generateStaticParams() {
  return apartments.map((a) => ({ id: a.id }));
}

export async function generateMetadata(props: PageProps<"/apartments/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const apt = apartments.find((a) => a.id === id);
  if (!apt) return {};
  return { title: apt.name, description: apt.description };
}

export default async function ApartmentDetailPage(props: PageProps<"/apartments/[id]">) {
  const { id } = await props.params;
  const apt = apartments.find((a) => a.id === id);
  if (!apt) notFound();

  const related = apartments.filter((a) => a.id !== apt.id).slice(0, 3);

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={apt.image} alt={apt.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/" className="text-sky-300 hover:text-sky-200">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/apartments" className="text-sky-300 hover:text-sky-200">Apartments</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{apt.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{apt.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${apt.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {apt.available ? "✓ Available" : "✗ Currently Booked"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 capitalize">{apt.type.replace("-", " ")}</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">About This Apartment</h2>
              <p className="text-slate-600 leading-relaxed">{apt.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Bedrooms", value: apt.bedrooms === 0 ? "Studio" : `${apt.bedrooms}`, icon: "🛏️" },
                { label: "Bathrooms", value: `${apt.bathrooms}`, icon: "🚿" },
                { label: "Size", value: `${apt.size} m²`, icon: "📐" },
                { label: "Type", value: apt.type.replace("-", " "), icon: "🏠" },
              ].map((d) => (
                <div key={d.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-bold text-slate-800 capitalize text-sm">{d.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {apt.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-sky-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {apt.amenities.map((a) => (
                  <span key={a} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm">{a}</span>
                ))}
              </div>
            </div>

            {apt.gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apt.gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${apt.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-sky-700">${apt.price}</span>
                <span className="text-slate-400 ml-2 text-sm">/ night</span>
              </div>
              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-in</label>
                  <input type="date" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Check-out</label>
                  <input type="date" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                </div>
              </div>
              <Link
                href="/contact"
                className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm transition-colors ${apt.available ? "bg-[#7B2D3A] text-white hover:bg-[#5C1D28]" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
              >
                {apt.available ? "Reserve Apartment" : "Not Available"}
              </Link>
              <p className="text-center text-xs text-slate-400 mt-3">No charge until confirmation</p>
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                {["Free high-speed WiFi", "Daily housekeeping", "Flexible check-in/out"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Other Apartments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-1">{r.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sky-700 font-bold">${r.price}<span className="text-slate-400 text-xs font-normal">/night</span></span>
                    <Link href={`/apartments/${r.id}`} className="text-sky-600 text-sm font-semibold hover:text-sky-700">View →</Link>
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
