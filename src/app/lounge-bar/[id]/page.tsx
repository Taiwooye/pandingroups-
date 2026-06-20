import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as barsApi from "@/services/endpoints/barsLounge";
import { ApiBar, ApiBarMenuItem } from "@/types";

const FALLBACK_IMAGE = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-4.jpg";

const CATEGORY_LABELS: Record<string, string> = {
  beers: "Beers",
  cocktails: "Cocktails",
  non_alcoholic: "Non-Alcoholic",
  spirits: "Spirits",
  wines: "Wines",
};

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/lounge-bar/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  try {
    const result = await barsApi.getBySlug(id);
    const bar: ApiBar = result.data;
    return { title: bar.name, description: bar.description };
  } catch {
    return {};
  }
}

export default async function LoungeDetailPage(props: PageProps<"/lounge-bar/[id]">) {
  const { id } = await props.params;

  let lounge: ApiBar;
  try {
    const result = await barsApi.getBySlug(id);
    lounge = result.data;
    if (!lounge) notFound();
  } catch {
    notFound();
  }

  const heroImage = lounge.media[0]?.url ?? lounge.media[1]?.url ?? FALLBACK_IMAGE;
  const gallery = lounge.media.slice(0, 5).map((m) => m.url);
  const isOpen = lounge.status.value === "open";
  const menuCategories = Object.entries(lounge.menu ?? {}).filter(([, items]) => items && (items as ApiBarMenuItem[]).length > 0);

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-72 md:h-96 lg:h-[480px]">
        <Image src={heroImage} alt={lounge.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-slate-900/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/" className="text-amber-300 hover:text-amber-200">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/lounge-bar" className="text-amber-300 hover:text-amber-200">Lounge & Bar</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/70">{lounge.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{lounge.name}</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isOpen ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}`}>
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">About {lounge.name}</h2>
            <p className="text-slate-600 leading-relaxed">{lounge.description}</p>
          </div>

          {lounge.features?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Features & Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {lounge.features.map((f) => (
                  <span key={f} className="px-4 py-2 bg-amber-50 text-amber-700 text-sm rounded-full font-medium border border-amber-100">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Full Menu */}
          {menuCategories.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Our Menu</h2>
              <div className="space-y-8">
                {menuCategories.map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-base font-bold text-[#5A0E24] mb-4 pb-2 border-b border-rose-100">
                      {CATEGORY_LABELS[category] ?? category}
                    </h3>
                    <div className="space-y-4">
                      {(items as ApiBarMenuItem[]).map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">{item.name}</h4>
                            {item.description && (
                              <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                            )}
                            {!item.is_available && (
                              <span className="text-xs text-red-500 font-medium">Currently unavailable</span>
                            )}
                          </div>
                          <span className="text-amber-700 font-bold text-lg shrink-0">₦{parseFloat(item.price).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gallery.map((img, i) => (
                  <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                    <Image src={img} alt={`${lounge.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
