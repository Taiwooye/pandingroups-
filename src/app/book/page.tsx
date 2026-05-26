"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  specialRequests: string;
};

function generateRef() {
  return "PDG-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const serviceLabels: Record<string, string> = {
  hotel: "Hotel Room",
  apartment: "Serviced Apartment",
  "event-hall": "Event Hall",
  "lounge-bar": "Lounge & Bar",
  dining: "Dining / Restaurant",
  other: "General Enquiry",
};

export default function BookPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef] = useState(generateRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-16 md:mt-20">
        <div className="bg-[#7B2D3A] py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Booking Request Confirmed!</h1>
          <p className="text-white/80 text-sm">Your reference number is <span className="font-bold text-white">{bookingRef}</span></p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h2 className="text-base font-bold text-slate-800 mb-4 uppercase tracking-wide">Booking Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference</span>
                    <span className="font-bold text-[#7B2D3A]">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-medium text-slate-800">{form.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service</span>
                    <span className="font-medium text-slate-800">{serviceLabels[form.service] || form.service}</span>
                  </div>
                  {form.checkIn && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Check-in</span>
                      <span className="font-medium text-slate-800">{form.checkIn}</span>
                    </div>
                  )}
                  {form.checkOut && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Check-out</span>
                      <span className="font-medium text-slate-800">{form.checkOut}</span>
                    </div>
                  )}
                  {form.guests && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-medium text-slate-800">{form.guests}</span>
                    </div>
                  )}
                </div>
                <div className="mt-5 pt-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                  Our team will send a confirmed price and invoice to <span className="font-medium text-slate-700">{form.email}</span> within 2 hours.
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Complete Your Payment</h2>
                <p className="text-slate-500 text-sm">To secure your booking, please transfer the deposit to the account below. Use your booking reference as the payment description.</p>
              </div>

              {/* Bank Details Card */}
              <div className="bg-white rounded-2xl border-2 border-[#7B2D3A]/20 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#7B2D3A] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Bank Transfer Details</h3>
                    <p className="text-xs text-slate-500">Transfer your deposit to the account below</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Bank Name", value: "Guaranty Trust Bank (GTBank)" },
                    { label: "Account Name", value: "PandinGroups Hotels Ltd" },
                    { label: "Account Number", value: "0123456789" },
                    { label: "Sort Code", value: "058-152-036" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{item.label}</div>
                      <div className="font-bold text-slate-800 text-sm">{item.value}</div>
                    </div>
                  ))}
                  <div className="sm:col-span-2 bg-[#7B2D3A]/5 rounded-xl p-4 border border-[#7B2D3A]/15">
                    <div className="text-xs font-semibold text-[#7B2D3A] uppercase tracking-wide mb-1">Payment Reference (Required)</div>
                    <div className="font-bold text-[#7B2D3A] text-lg tracking-widest">{bookingRef}</div>
                    <div className="text-xs text-slate-500 mt-1">Include this reference in your transfer description so we can identify your payment.</div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Make the Transfer", desc: "Transfer your deposit to the GTBank account above. Use your reference number as the description." },
                    { step: "2", title: "Send Proof of Payment", desc: `WhatsApp or email your bank receipt to +234 (0) 123 456 7890 or info@pandingroups.com with your reference ${bookingRef}.` },
                    { step: "3", title: "Receive Confirmation", desc: "Our team confirms your booking within 2 hours and sends your official booking voucher by email." },
                    { step: "4", title: "Arrive & Enjoy", desc: "Present your voucher on arrival. Check-in from 2:00 PM. Our team will be ready to welcome you." },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#7B2D3A] text-white text-sm font-bold flex items-center justify-center shrink-0">{s.step}</div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{s.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-amber-700">Your booking is <strong>not confirmed</strong> until payment is received and verified. Bookings are held for <strong>24 hours</strong> before being released. For immediate assistance, call <strong>+234 (0) 123 456 7890</strong>.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/" className="flex-1 text-center px-5 py-3 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors text-sm">
                  Back to Home
                </Link>
                <Link href="/contact" className="flex-1 text-center px-5 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve your room, apartment, or event space at PandinGroups. Fast, simple, and confirmed within 2 hours."
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book Now" }]}
        height="sm"
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Make a Reservation</h2>
              <p className="text-slate-500 text-sm mt-2">Fill in your details and we will get back to you promptly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-slate-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-slate-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Service *</label>
                <select name="service" value={form.service} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white text-slate-700">
                  <option value="">Select a service</option>
                  <option value="hotel">Hotel Room</option>
                  <option value="apartment">Serviced Apartment</option>
                  <option value="event-hall">Event Hall</option>
                  <option value="lounge-bar">Lounge & Bar</option>
                  <option value="dining">Dining / Restaurant</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-in Date</label>
                <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-out Date</label>
                <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white">
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                  <option value="9+">9+ guests</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Special Requests</label>
              <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4}
                placeholder="Any special requirements, dietary needs, or requests..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none placeholder-slate-400" />
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
              {[
                { icon: "🔒", text: "Secure Booking" },
                { icon: "✅", text: "Free Cancellation" },
                { icon: "⚡", text: "Confirmed in 2hrs" },
              ].map((t) => (
                <div key={t.text} className="flex flex-col items-center text-center gap-1">
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-xs text-slate-500 font-medium">{t.text}</span>
                </div>
              ))}
            </div>

            <button type="submit"
              className="w-full py-3.5 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors shadow-md text-sm">
              Confirm Booking Request →
            </button>
            <p className="text-xs text-slate-400 text-center">No charge until payment is confirmed · Booking held for 24 hours</p>
          </form>
        </div>
      </section>
    </div>
  );
}
