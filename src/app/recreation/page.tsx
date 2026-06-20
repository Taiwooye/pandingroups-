import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import * as recreationApi from "@/services/endpoints/recreation";
import { ApiRecreation } from "@/types";

export const metadata: Metadata = {
  title: "Recreation & Wellness | PaNDiN Group",
  description: "Experience the perfect balance of fitness and relaxation at PaNDiN Recreation & Wellness — swimming, basketball, billiards, table tennis, snooker, and gym facilities.",
};

export const dynamic = "force-dynamic";

const FALLBACK_HERO = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-1.jpg";

const TYPE_ICONS: Record<string, string> = {
  pool: "🏊",
  basketball: "🏀",
  billiards: "🎱",
  table_tennis: "🏓",
  gym: "🏋️",
};

export default async function RecreationPage() {
  let activities: ApiRecreation[] = [];
  try {
    const result = await recreationApi.list();
    activities = result.data ?? [];
  } catch {
    activities = [];
  }

  return (
    <div>
      <PageHero
        title="Recreation & Wellness"
        subtitle="Experience the perfect balance of fitness and relaxation. From the pool to the court — we offer something for everyone."
        image={FALLBACK_HERO}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Recreation" }]}
        height="md"
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Active Living</span>
          <h2 className="text-3xl font-bold text-slate-800 mt-2 mb-4">Stay Active. Stay Well.</h2>
          <p className="text-slate-600 leading-relaxed">
            Whether you are looking to stay active, unwind, or enjoy friendly competition, our Recreation &amp; Wellness facilities provide the ideal setting for both leisure and performance. From invigorating workouts to engaging sports and refreshing poolside moments — we offer something for everyone seeking a well-rounded lifestyle.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((a) => {
              const isComingSoon = a.status.value === "coming_soon";
              return (
                <div key={a.slug} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  <div className="text-5xl mb-4">{TYPE_ICONS[a.type.value] ?? "🎯"}</div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">{a.name}</h3>
                    {isComingSoon && (
                      <span className="px-2 py-0.5 text-xs rounded-full font-semibold bg-amber-100 text-amber-700">Coming Soon</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{a.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(a.features ?? []).map((h) => (
                      <span key={h} className="px-3 py-1 text-xs rounded-full font-medium bg-amber-50 text-amber-700">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section className="py-16 bg-[#5A0E24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8">
            Sign up for swimming lessons, book a court, join a basketball clinic, or enquire about our sports programs. Our team is ready to help you get active.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-7 py-3 bg-white text-[#5A0E24] font-semibold rounded-xl hover:bg-amber-50 transition-colors">
              Sign Up / Enquire
            </Link>
            <a href="tel:+2347054422968" className="px-7 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Call +234 705 442 2968
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
