import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as barsLoungeApi from "@/services/endpoints/barsLounge";
import { ApiBar, ApiBarMenuItem } from "@/types";

const FALLBACK_IMAGE = "/images/gallery/exterior-4.jpg";

// Display order and labels for menu categories (API groups them alphabetically)
const CATEGORY_LABELS: Record<string, string> = {
  cocktails: "Cocktails",
  wines: "Wines",
  beers: "Beers",
  spirits: "Spirits",
  non_alcoholic: "Non-Alcoholic",
};

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/lounge-bar/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  try {
    const result = await barsLoungeApi.getBySlug(id);
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
    const result = await barsLoungeApi.getBySlug(id);
    lounge = result.data;
    if (!lounge) notFound();
  } catch {
    notFound();
  }

  const heroImage = lounge.media[0]?.url ?? lounge.media[1]?.url ?? FALLBACK_IMAGE;
  const gallery = lounge.media.slice(0, 5).map((m) => m.url);
  const isOpen = lounge.status.value === "open";
  const menu: Record<string, ApiBarMenuItem[] | undefined> = lounge.menu ?? {};
  const categoryOrder = [
    ...Object.keys(CATEGORY_LABELS),
    ...Object.keys(menu).filter((value) => !(value in CATEGORY_LABELS)),
  ];
  const menuCategories = categoryOrder
    .filter((value) => (menu[value]?.length ?? 0) > 0)
    .map((value) => ({
      value,
      label: CATEGORY_LABELS[value] ?? value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      items: menu[value]!,
    }));

  return (
    <div className="mt-16 md:mt-20">
      <div className="relative h-80 md:h-[28rem] lg:h-[540px] overflow-hidden bg-wine-deep">
        <Image src={heroImage} alt={lounge.name} fill className="object-cover animate-ken-burns" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/50 to-wine-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
          <nav className="hero-enter flex items-center gap-2 mb-4 text-sm">
            <Link href="/" className="text-gold-light hover:text-white">Home</Link>
            <span className="text-gold/60">/</span>
            <Link href="/lounge-bar" className="text-gold-light hover:text-white">Lounge & Bar</Link>
            <span className="text-gold/60">/</span>
            <span className="text-white/70">{lounge.name}</span>
          </nav>
          <h1 className="hero-enter font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight" style={{ "--enter-delay": "150ms" } as React.CSSProperties}>{lounge.name}</h1>
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
            <h2 className="text-xl font-serif font-semibold text-wine mb-3">About {lounge.name}</h2>
            <p className="text-slate-600 leading-relaxed">{lounge.description}</p>
          </div>

          {lounge.features?.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-semibold text-wine mb-4">Features & Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {lounge.features.map((f) => (
                  <span key={f} className="px-4 py-2 bg-cream text-gold-dark text-sm rounded-full font-medium border border-gold/30">{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Full Menu */}
          {menuCategories.length > 0 && (
            <div>
              <h2 className="text-xl font-serif font-semibold text-wine mb-6">Our Menu</h2>
              <div className="space-y-8">
                {menuCategories.map((cat) => (
                  <div key={cat.value}>
                    <h3 className="text-base font-bold text-primary mb-4 pb-2 border-b border-rose-100">
                      {cat.label}
                    </h3>
                    <div className="space-y-4">
                      {cat.items.map((item) => (
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
                          <span className="text-gold-dark font-bold text-lg shrink-0">₦{parseFloat(item.price).toLocaleString()}</span>
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
              <h2 className="text-xl font-serif font-semibold text-wine mb-4">Gallery</h2>
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
