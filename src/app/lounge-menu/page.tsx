import type { Metadata } from "next";
import * as barsApi from "@/services/endpoints/barsLounge";
import { ApiBar, ApiBarMenuItem } from "@/types";

export const metadata: Metadata = {
  title: "Bar & Lounge Menu – PaNDiN Group",
  description: "Full drinks & bar menu for DarNis Lounge and Pool Side Bar at PaNDiN Group, Ibadan.",
};

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  beers: "Beers",
  cocktails: "Cocktails",
  non_alcoholic: "Non-Alcoholic",
  spirits: "Spirits",
  wines: "Wines",
};

export default async function LoungeMenuPage() {
  let lounges: ApiBar[] = [];
  try {
    const result = await barsApi.list();
    lounges = result.data ?? [];
  } catch {
    lounges = [];
  }

  return (
    <div className="min-h-screen bg-[#494B67] text-white">
      {/* Header */}
      <div className="bg-[#5A0E24] px-6 py-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V12h6v9M3 10h18" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">PaNDiN Group</h1>
        <p className="text-white/70 text-sm mt-1">Bar & Lounge Menu</p>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto space-y-10">
        {lounges.map((lounge) => {
          const isOpen = lounge.status.value === "open";
          const menuCategories = Object.entries(lounge.menu ?? {}).filter(
            ([, items]) => items && (items as ApiBarMenuItem[]).length > 0
          );

          return (
            <section key={lounge.slug}>
              {/* Lounge header */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-amber-400">{lounge.name}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isOpen ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {isOpen ? "Open" : "Closed"}
                  </span>
                </div>
                {lounge.description && (
                  <p className="text-slate-400 text-xs">{lounge.description}</p>
                )}
              </div>

              {/* Menu by category */}
              {menuCategories.length > 0 ? (
                <div className="space-y-6">
                  {menuCategories.map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#E8A87C] mb-3 pb-2 border-b border-slate-700">
                        {CATEGORY_LABELS[category] ?? category}
                      </h3>
                      <div className="space-y-3">
                        {(items as ApiBarMenuItem[]).map((item) => (
                          <div key={item.id} className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${item.is_available ? "text-white" : "text-slate-500 line-through"}`}>
                                {item.name}
                              </p>
                              {item.description && (
                                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.description}</p>
                              )}
                              {!item.is_available && (
                                <span className="text-xs text-red-400">Unavailable</span>
                              )}
                            </div>
                            <span className="text-amber-400 font-bold text-sm shrink-0">
                              ₦{parseFloat(item.price).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">Menu coming soon.</p>
              )}
            </section>
          );
        })}

        {lounges.length === 0 && (
          <p className="text-center text-slate-400 py-12">Menu not available at this time.</p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-6 text-center">
        <p className="text-slate-500 text-xs">To reserve a table, call or WhatsApp</p>
        <a href="tel:+2347054422968" className="text-amber-400 font-semibold text-sm mt-1 block">
          +234 705 442 2968
        </a>
        <p className="text-slate-600 text-xs mt-3">© PaNDiN Group · Ibadan, Nigeria</p>
      </div>
    </div>
  );
}
