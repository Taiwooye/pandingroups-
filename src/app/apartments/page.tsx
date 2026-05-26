import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import apartmentsData from "@/data/apartments.json";
import { Apartment } from "@/types";

export const metadata: Metadata = {
  title: "Serviced Apartments",
  description: "Spacious, fully-furnished serviced apartments at PandinGroups for short and extended stays. From studios to luxury penthouses.",
};

const apartments = apartmentsData as Apartment[];

export default function ApartmentsPage() {
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
            {["All", "Studio", "1-Bedroom", "2-Bedroom", "3-Bedroom", "Penthouse"].map((t) => (
              <span
                key={t}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  t === "All"
                    ? "bg-sky-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {t}
              </span>
            ))}
            <span className="ml-auto text-sm text-slate-500">{apartments.length} apartments found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={apt.image} alt={apt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${apt.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {apt.available ? "Available" : "Booked"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-sky-600/90 text-white capitalize">
                      {apt.type.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{apt.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{apt.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    {apt.bedrooms > 0 && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7h18" />
                        </svg>
                        {apt.bedrooms} {apt.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {apt.bathrooms} Bath
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {apt.size} m²
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {apt.features.slice(0, 3).map((f) => (
                      <span key={f} className="px-2 py-0.5 bg-sky-50 text-sky-700 text-xs rounded-full font-medium">{f}</span>
                    ))}
                    {apt.features.length > 3 && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">+{apt.features.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-2xl font-bold text-sky-700">${apt.price}</span>
                      <span className="text-sm text-slate-400 ml-1">/ night</span>
                    </div>
                    <Link href={`/apartments/${apt.id}`} className="px-4 py-2 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-14 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🏠", title: "Home Comforts", desc: "Full kitchen, laundry, living areas" },
              { icon: "🛎️", title: "Hotel Services", desc: "Daily housekeeping & concierge" },
              { icon: "📅", title: "Flexible Terms", desc: "Daily, weekly, or monthly stays" },
              { icon: "🔐", title: "Secure & Private", desc: "Key-card access & 24/7 security" },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-5 text-center shadow-sm">
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
