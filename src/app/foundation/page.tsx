import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import * as foundationApi from "@/services/endpoints/foundation";
import { ApiFoundationProgram } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PaNDiN Foundation",
  description: "At PaNDiN Foundation, we are committed to making a difference through impactful community initiatives — education, healthcare, and empowerment.",
};

const FALLBACK_IMAGE = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-2.jpg";

export default async function FoundationPage() {
  let programs: ApiFoundationProgram[] = [];
  try {
    const result = await foundationApi.list();
    programs = (result.data ?? []).sort(
      (a: ApiFoundationProgram, b: ApiFoundationProgram) => a.sort_order - b.sort_order
    );
  } catch {
    programs = [];
  }

  return (
    <div>
      <PageHero
        title="PaNDiN Foundation"
        subtitle="Committed to making a difference through impactful community initiatives — empowering lives, one step at a time."
        image={FALLBACK_IMAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Foundation" }]}
        height="md"
      />

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-6">Making a Difference</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            At the PaNDiN Foundation, we are committed to making a difference through impactful community initiatives. From educational programs, skill development, and healthcare support to social empowerment programs and philanthropic initiatives that foster growth, talent development, and upward mobility — we strive to create a better future for all.
          </p>
        </div>
      </section>

      {/* Programs — live from API */}
      {programs.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Programs</span>
              <h2 className="text-3xl font-bold text-slate-800 mt-2">What We Do</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl mb-5">{p.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description}</p>
                  {p.external_url && (
                    <a
                      href={p.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-600 font-semibold text-sm hover:text-amber-700"
                    >
                      Learn more
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#5A0E24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Involved</h2>
          <p className="text-white/80 text-lg mb-8">
            Whether you want to donate, volunteer, or learn more about our programs — we would love to hear from you. Together we can create a better future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-7 py-3 bg-white text-[#5A0E24] font-semibold rounded-xl hover:bg-amber-50 transition-colors">
              Contact Us
            </Link>
            {programs.find((p) => p.external_url) && (
              <a
                href={programs.find((p) => p.external_url)!.external_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-400 transition-colors"
              >
                That Next Step Africa &rarr;
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
