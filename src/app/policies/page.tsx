import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies | PaNDiN Group",
  description: "Damage, refund, and cancellation policies for PaNDiN Group Hotels & Apartments.",
};

const DAMAGE_CHARGES = [
  { item: "Duvet Cover, Bed Spread Stain or Damaged", amount: "₦10,000" },
  { item: "Pillowcase Stain or Damaged (per one)", amount: "₦5,000" },
  { item: "Towel Stains or Damaged", amount: "₦10,000" },
  { item: "Wall Stains", amount: "₦10,000" },
  { item: "Lost or Damaged Key Card", amount: "₦10,000" },
  { item: "Lost or Damaged Remote Control", amount: "₦10,000" },
  { item: "Lost or Damaged Cup / Saucer", amount: "₦2,000" },
];

export default function PoliciesPage() {
  return (
    <div className="mt-16 md:mt-20">
      {/* Hero */}
      <div className="bg-[#C41230] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-4 text-sm">
            <Link href="/" className="text-red-200 hover:text-white">Home</Link>
            <span className="text-red-300">/</span>
            <span className="text-white">Policies</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Guest Policies</h1>
          <p className="text-red-100 mt-3 max-w-xl">
            To ensure comfort for all guests and maintain our facilities to the highest standard, please review the policies below before your stay.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        {/* Damage Policy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#C41230]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Damage Policy</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5">
            To ensure guest comfort and maintain our facilities, the following charges will be applied if any damage occurs during your stay.
          </p>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Item</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DAMAGE_CHARGES.map((row) => (
                  <tr key={row.item} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 text-slate-700">{row.item}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-[#C41230]">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 italic">
            Applicable to stains including blood, makeup, dye, stew, etc.
          </p>
        </section>

        {/* Refund Policy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Refund Policy</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                Refunds will be processed through the original payment method unless otherwise specified by the customer.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                Kindly note that refunds may take <strong className="text-slate-800">48 – 72 hours</strong> to reflect in your account.
              </p>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Cancellation Policy</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                Cancellations will be processed through the original payment method unless otherwise specified by the customer.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                A <strong className="text-slate-800">25% cancellation fee</strong> of the total amount paid will be applied.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
              <p className="text-slate-600 text-sm leading-relaxed">
                Refunds for cancellations may take up to <strong className="text-slate-800">72 hours</strong> to process.
              </p>
            </div>
          </div>
        </section>

        {/* Contact strip */}
        <div className="bg-slate-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-800">Questions about our policies?</p>
            <p className="text-sm text-slate-500 mt-0.5">Our team is available 24/7 to help.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="tel:+2347054422968" className="px-5 py-2.5 bg-[#C41230] text-white text-sm font-semibold rounded-xl hover:bg-[#9C0E25] transition-colors">
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
