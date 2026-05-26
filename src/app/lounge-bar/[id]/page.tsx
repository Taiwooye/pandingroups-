import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import loungeData from "@/data/lounge-bar.json";
import { LoungeBar } from "@/types";

const lounges = loungeData as LoungeBar[];

export async function generateStaticParams() {
  return lounges.map((l) => ({ id: l.id }));
}

export async function generateMetadata(props: PageProps<"/lounge-bar/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const lounge = lounges.find((l) => l.id === id);
  if (!lounge) return {};
  return { title: lounge.name, description: lounge.description };
}

export default async function LoungeDetailPage(props: PageProps<"/lounge-bar/[id]">) {
  const { id } = await props.params;
  const lounge = lounges.find((l) => l.id === id);
  if (!lounge) notFound();

  const menuCategories = [...new Set(lounge.menu.map((item) => item.category))];

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={lounge.image} alt={lounge.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/" className="text-sky-300 hover:text-sky-200">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/lounge-bar" className="text-sky-300 hover:text-sky-200">Lounge & Bar</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{lounge.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{lounge.name}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lounge.available ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
              {lounge.available ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">About {lounge.name}</h2>
              <p className="text-slate-600 leading-relaxed">{lounge.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Features & Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {lounge.features.map((f) => (
                  <span key={f} className="px-4 py-2 bg-sky-50 text-sky-700 text-sm rounded-full font-medium border border-sky-100">{f}</span>
                ))}
              </div>
            </div>

            {/* Full Menu */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Our Menu</h2>
              <div className="space-y-8">
                {menuCategories.map((category) => (
                  <div key={category}>
                    <h3 className="text-base font-bold text-[#7B2D3A] mb-4 pb-2 border-b border-rose-100">{category}</h3>
                    <div className="space-y-4">
                      {lounge.menu
                        .filter((item) => item.category === category)
                        .map((item) => (
                          <div key={item.name} className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800">{item.name}</h4>
                              <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                            </div>
                            <span className="text-sky-700 font-bold text-lg shrink-0">${item.price}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {lounge.gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {lounge.gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${lounge.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-slate-900 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Make a Reservation</h3>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Time</label>
                  <select className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option>
                    <option>9:00 PM</option><option>10:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Guests</label>
                  <select className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                  </select>
                </div>
              </div>
              <Link href="/book" className="flex items-center justify-center w-full py-3 rounded-xl bg-[#7B2D3A] text-white font-semibold text-sm hover:bg-[#5C1D28] transition-colors">
                Reserve a Table
              </Link>
              <div className="mt-5 pt-5 border-t border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +234 (0) 123 456 7890
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
