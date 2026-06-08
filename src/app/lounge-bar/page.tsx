import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import loungeData from "@/data/lounge-bar.json";
import { LoungeBar } from "@/types";

export const metadata: Metadata = {
  title: "Lounge & Bar",
  description: "Experience PandinGroups' exclusive bars and lounges. Craft cocktails, premium spirits, live music, and stunning ambiance.",
};

const lounges = loungeData as LoungeBar[];

export default function LoungeBarPage() {
  return (
    <div>
      <PageHero
        title="Lounge & Bar"
        subtitle="Unwind with signature cocktails, live music, and breathtaking views in our exclusive bars and lounges."
        image="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Lounge & Bar" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {lounges.map((lounge, idx) => (
              <div
                key={lounge.id}
                className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-0`}
              >
                <div className="relative w-full lg:w-1/2 h-72 lg:h-96 shrink-0 overflow-hidden lg:rounded-l-3xl">
                  <Image src={lounge.image} alt={lounge.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${lounge.available ? "bg-green-100/90 text-green-700" : "bg-red-100/90 text-red-700"}`}>
                      {lounge.available ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{lounge.name}</h2>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{lounge.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {lounge.features.map((f) => (
                      <span key={f} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">{f}</span>
                    ))}
                  </div>

                  {/* Preview menu */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-5">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Menu Highlights</h3>
                    <div className="space-y-2">
                      {lounge.menu.slice(0, 3).map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700 font-medium">{item.name}</span>
                          <span className="text-amber-600 font-bold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/lounge-bar/${lounge.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C41230] text-white text-sm font-semibold rounded-xl hover:bg-[#921224] transition-colors">
                    View Full Menu & Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="py-14 bg-[#494B67]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "ðŸ¹", title: "50+ Cocktails", desc: "Signature and classic cocktails crafted by award-winning mixologists" },
              { icon: "ðŸŽµ", title: "Live Music", desc: "Jazz, Afrobeats, and R&B performances every Friday and Saturday night" },
              { icon: "ðŸ¥ƒ", title: "Rare Spirits", desc: "An unparalleled selection of aged whiskies, cognacs, and fine wines" },
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