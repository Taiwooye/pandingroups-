import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import diningData from "@/data/dining.json";
import { DiningItem } from "@/types";

export const metadata: Metadata = {
  title: "Dining & Restaurants",
  description: "Savor extraordinary culinary experiences at PandinGroups — from signature fine dining to casual poolside grilling.",
};

const restaurants = diningData as DiningItem[];

export default function DiningPage() {
  return (
    <div>
      <PageHero
        title="Dining & Restaurants"
        subtitle="From award-winning fine dining to relaxed poolside grilling — every meal at PandinGroups is a celebration."
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dining" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {restaurants.map((restaurant, idx) => (
            <div key={restaurant.id}>
              <div className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-start`}>
                {/* Image */}
                <div className="relative w-full lg:w-2/5 h-72 lg:h-96 rounded-2xl overflow-hidden shadow-lg shrink-0">
                  <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-[#7B2D3A]/90 text-white text-xs font-semibold rounded-full">
                      {restaurant.priceRange}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <span className="text-sky-600 text-xs font-semibold uppercase tracking-wider">{restaurant.cuisine}</span>
                  <h2 className="text-2xl font-bold text-slate-800 mt-1 mb-3">{restaurant.name}</h2>
                  <p className="text-slate-500 leading-relaxed mb-5">{restaurant.description}</p>

                  <div className="flex flex-wrap gap-3 mb-5 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {restaurant.openHours}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {restaurant.features.map((f) => (
                      <span key={f} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs rounded-full font-medium">{f}</span>
                    ))}
                  </div>

                  {/* Sample Menu */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-slate-700 mb-4">Menu Highlights</h3>
                    <div className="space-y-5">
                      {restaurant.menu.slice(0, 2).map((section) => (
                        <div key={section.section}>
                          <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-2">{section.section}</h4>
                          <div className="space-y-2">
                            {section.items.slice(0, 2).map((item) => (
                              <div key={item.name} className="flex items-center justify-between text-sm gap-4">
                                <div>
                                  <span className="font-medium text-slate-700">{item.name}</span>
                                  <span className="text-slate-400 text-xs ml-2">— {item.description.slice(0, 50)}{item.description.length > 50 ? "..." : ""}</span>
                                </div>
                                <span className="text-sky-700 font-bold shrink-0">${item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link href="/contact" className="px-5 py-2.5 bg-[#7B2D3A] text-white text-sm font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors">
                      Reserve a Table
                    </Link>
                    <a href="tel:+2341234567890" className="px-5 py-2.5 bg-white text-sky-600 text-sm font-semibold rounded-xl border border-sky-200 hover:bg-sky-50 transition-colors">
                      Call for Enquiries
                    </a>
                  </div>
                </div>
              </div>

              {idx < restaurants.length - 1 && <div className="mt-16 border-t border-slate-100" />}
            </div>
          ))}
        </div>
      </section>

      {/* Dining Experience CTA */}
      <section className="py-14 bg-[#5C1D28]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Private Dining Available</h2>
          <p className="text-white/80 mb-6 text-sm">
            Planning a special occasion? Our private dining rooms can be reserved for intimate celebrations, business dinners, and unforgettable moments.
          </p>
          <Link href="/contact" className="inline-block px-7 py-3 bg-white text-[#7B2D3A] font-semibold rounded-xl hover:bg-rose-50 transition-colors">
            Enquire About Private Dining
          </Link>
        </div>
      </section>
    </div>
  );
}
