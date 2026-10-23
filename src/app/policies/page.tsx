import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import * as policiesApi from "@/services/endpoints/policies";
import { ApiDamageCharge, ApiPolicy } from "@/types";

export const metadata: Metadata = {
  title: "Policies | PaNDiN Group",
  description: "Damage, refund, and cancellation policies for PaNDiN Group Hotels & Apartments.",
};

export const dynamic = "force-dynamic";

const POLICY_STYLES: Record<string, { iconBg: string; iconColor: string; dot: string; iconPath: string }> = {
  damage: {
    iconBg: "bg-red-50",
    iconColor: "text-primary",
    dot: "bg-[#5A0E24]",
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  refund: {
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    dot: "bg-green-500",
    iconPath: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6",
  },
  cancellation: {
    iconBg: "bg-cream",
    iconColor: "text-gold-dark",
    dot: "bg-gold",
    iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

const DEFAULT_STYLE = {
  iconBg: "bg-slate-100",
  iconColor: "text-slate-600",
  dot: "bg-slate-400",
  iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

// Split policy text into sentences so each renders as its own bullet
function toSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
}

export default async function PoliciesPage() {
  let policies: ApiPolicy[] = [];
  let damageCharges: ApiDamageCharge[] = [];
  try {
    const [policiesResult, chargesResult] = await Promise.allSettled([
      policiesApi.list(),
      policiesApi.listDamageCharges(),
    ]);
    if (policiesResult.status === "fulfilled") policies = policiesResult.value.data ?? [];
    if (chargesResult.status === "fulfilled") {
      damageCharges = (chargesResult.value.data ?? []).sort(
        (a: ApiDamageCharge, b: ApiDamageCharge) => a.sort_order - b.sort_order
      );
    }
  } catch {
    // keep defaults
  }

  return (
    <div className="bg-cream">
      <PageHero
        title="Guest Policies"
        subtitle="To ensure comfort for all guests and maintain our facilities to the highest standard, please review the policies below before your stay."
        image="/images/gallery/exterior-3.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Policies" }]}
        height="sm"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        {policies.map((policy) => {
          const style = POLICY_STYLES[policy.type] ?? DEFAULT_STYLE;
          const isDamage = policy.type === "damage";
          return (
            <section key={policy.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center`}>
                  <svg className={`w-5 h-5 ${style.iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={style.iconPath} />
                  </svg>
                </div>
                <h2 className="text-xl font-serif font-semibold text-wine">{policy.title}</h2>
              </div>

              {isDamage ? (
                <>
                  <p className="text-slate-500 text-sm mb-5">{policy.content}</p>
                  {damageCharges.length > 0 && (
                    <div className="bg-white rounded-2xl border border-cream-dark shadow-sm overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-cream border-b border-cream-dark">
                          <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Item</th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Charge</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {damageCharges.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50">
                              <td className="px-5 py-3.5 text-slate-700">{row.item}</td>
                              <td className="px-5 py-3.5 text-right font-bold text-primary">
                                ₦{parseFloat(row.charge).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6 space-y-4">
                  {toSentences(policy.content).map((sentence, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${style.dot} mt-2 shrink-0`} />
                      <p className="text-slate-600 text-sm leading-relaxed">{sentence}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {policies.length === 0 && (
          <p className="text-slate-500 text-sm">
            Our policies are temporarily unavailable. Please contact us for details.
          </p>
        )}

        {/* Contact strip */}
        <div className="bg-cream rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-800">Questions about our policies?</p>
            <p className="text-sm text-slate-500 mt-0.5">Our team is available 24/7 to help.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="tel:+2347054422968" className="btn-wine px-5 py-2.5 text-sm font-semibold rounded-full">
              Call Us
            </a>
            <Link href="/contact" className="px-5 py-2.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
