import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import * as barsApi from "@/services/endpoints/barsLounge";
import { ApiBar, ApiBarMenuItem } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The PaNDiN Lounge Collection | PaNDiN Group",
  description: "Discover the PaNDiN Lounge Collection. Where luxury meets lifestyle.",
};

const FALLBACK_IMAGE = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-4.jpg";

function flattenMenu(bar: ApiBar): ApiBarMenuItem[] {
  if (!bar.menu) return [];
  return Object.values(bar.menu).flat().filter(Boolean) as ApiBarMenuItem[];
}

export default async function LoungeBarPage() {
  let lounges: ApiBar[] = [];
  try {
    const result = await barsApi.list();
    lounges = result.data ?? [];
  } catch {
    lounges = [];
  }

  return (
    <div>
      <PageHero
        title="The PaNDiN Lounge Collection"
        subtitle="Where Luxury Meets Lifestyle. From premium drinks and exceptional cuisine to unforgettable experiences — every visit promises comfort, style, and outstanding hospitality."
        image={lounges.find((l) => l.media[0]?.url)?.media[0]?.url ?? lounges.find((l) => l.media[1]?.url)?.media[1]?.url ?? FALLBACK_IMAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Lounge & Bar" }]}
        height="md"
      />

      {/* Intro */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 leading-relaxed text-base">
            Discover a world of relaxation, entertainment, and luxury through The PaNDiN Lounge Collection. Whether you&apos;re seeking a vibrant social atmosphere, a refreshing poolside escape, or an exclusive private setting, PaNDiN offers carefully curated spaces designed to suit every occasion.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {lounges.map((l) => (
              <span key={l.slug} className="px-4 py-2 bg-[#5A0E24]/8 text-[#5A0E24] text-sm font-semibold rounded-full border border-[#5A0E24]/20">
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {lounges.map((lounge, idx) => {
              const image = lounge.media[0]?.url ?? FALLBACK_IMAGE;
              const isOpen = lounge.status.value === "open";
              const menuHighlights = flattenMenu(lounge).slice(0, 3);

              return (
                <div
                  key={lounge.slug}
                  className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100`}
                >
                  <div className="relative w-full lg:w-1/2 h-72 lg:h-96 shrink-0 overflow-hidden">
                    <Image src={image} alt={lounge.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${isOpen ? "bg-green-100/90 text-green-700" : "bg-red-100/90 text-red-700"}`}>
                        {isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{lounge.name}</h2>
                    <p className="text-slate-500 text-sm mb-5 leading-relaxed">{lounge.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(lounge.features ?? []).map((f) => (
                        <span key={f} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">{f}</span>
                      ))}
                    </div>

                    {menuHighlights.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4 mb-5">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Menu Highlights</h3>
                        <div className="space-y-2">
                          {menuHighlights.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span className="text-slate-700 font-medium">{item.name}</span>
                              <span className="text-amber-600 font-bold">&#8358;{parseFloat(item.price).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link href={`/lounge-bar/${lounge.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A0E24] text-white text-sm font-semibold rounded-xl hover:bg-[#921224] transition-colors">
                      View Full Menu & Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="py-14 bg-[#494B67]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🍹", title: "Signature Cocktails", desc: "Premium spirits, signature cocktails, and a wide selection of fine wines and local cuisine" },
              { icon: "🎵", title: "Live Entertainment", desc: "Live music, special events, and a vibrant social atmosphere to elevate every visit" },
              { icon: "🥃", title: "Exclusive Lounges", desc: "Distinct lounge experiences — from social bar to serene poolside and private retreat" },
            ].map((item) => (
              <div key={item.title} className="text-white">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
