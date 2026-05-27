"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import roomsData from "@/data/hotel-rooms.json";
import apartmentsData from "@/data/apartments.json";

const hotelRooms = roomsData as { id: string; name: string; price: number; image: string; category: string; capacity: number }[];
const apartments = apartmentsData as { id: string; name: string; price: number; image: string; type: string; bedrooms: number }[];

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  roomSelection: string;
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
  apartment: "Luxury Apartment",
  "event-hall": "Event Hall (Nwando's)",
  "lounge-bar": "DarNis Lounge / Pool Bar",
  recreation: "Recreation & Wellness",
  other: "General Enquiry",
};

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const preService = searchParams.get("service") || "";
  const preRoom = searchParams.get("room") || "";

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: preService,
    roomSelection: preRoom,
    checkIn: "",
    checkOut: "",
    guests: "",
    specialRequests: "",
  });
  const [step, setStep] = useState<"select" | "form" | "payment" | "sending" | "done">(
    preService ? "form" : "select"
  );
  const [bookingRef] = useState(generateRef);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    if (preService) setStep("form");
  }, [preService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectService = (service: string) => {
    setForm({ ...form, service, roomSelection: "" });
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTransferConfirm = useCallback(async () => {
    setSendError("");
    setStep("sending");
    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bookingRef }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed");
      setStep("done");
      setTimeout(() => router.push("/"), 3000);
    } catch {
      setSendError("Could not send confirmation email. Please contact us directly.");
      setStep("payment");
    }
  }, [form, bookingRef, router]);

  // ── Service selector ─────────────────────────────────────────────────────────
  if (step === "select") {
    return (
      <div>
        <PageHero
          title="Book Your Stay"
          subtitle="Choose your experience and we will confirm your booking within 2 hours."
          image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book Now" }]}
          height="sm"
        />
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-800">What would you like to book?</h2>
              <p className="text-slate-500 text-sm mt-2">Select a service to continue, or browse available rooms below.</p>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { key: "hotel", icon: "🏨", title: "Hotel Room", desc: "Nkrumah, Fela, Zik, Mandela Suite", price: "From ₦23,000/night" },
                { key: "apartment", icon: "🏠", title: "Luxury Apartment", desc: "1BR, 2BR, 3BR & 4BR apartments", price: "From ₦100,000/night" },
                { key: "event-hall", icon: "🎉", title: "Event Hall", desc: "Nwando's Event Hall — up to 500 guests", price: "₦400,000/day" },
                { key: "lounge-bar", icon: "🍹", title: "DarNis Lounge / Pool Bar", desc: "Reserve a table at our lounge or pool bar", price: "Reservation only" },
                { key: "recreation", icon: "🏊", title: "Recreation & Wellness", desc: "Pool, gym, sports & activities", price: "Ask for rates" },
                { key: "other", icon: "💬", title: "General Enquiry", desc: "Not sure? We will help you choose", price: "Contact us" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleSelectService(s.key)}
                  className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-[#5A0E24] hover:shadow-lg transition-all duration-200 text-left group"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-[#5A0E24] transition-colors">{s.title}</h3>
                  <p className="text-slate-500 text-sm mb-3">{s.desc}</p>
                  <span className="text-amber-600 font-semibold text-sm">{s.price}</span>
                </button>
              ))}
            </div>

            {/* Available Rooms Preview */}
            <div className="border-t border-slate-100 pt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Available Hotel Rooms</h3>
                <Link href="/hotel" className="text-amber-600 text-sm font-semibold hover:text-amber-700">View all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {hotelRooms.filter(r => r).map((room) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setForm(f => ({ ...f, service: "hotel", roomSelection: room.name }));
                      setStep("form");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-[#5A0E24] hover:shadow-md transition-all text-left group"
                  >
                    <div className="relative h-36">
                      <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2">
                        <span className="bg-[#5A0E24]/90 text-white text-xs px-2 py-0.5 rounded-full font-semibold capitalize">{room.category}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-slate-800 text-sm">{room.name}</p>
                      <p className="text-amber-600 font-bold text-sm mt-0.5">₦{room.price.toLocaleString()}<span className="text-slate-400 font-normal">/night</span></p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 mb-6">
                <h3 className="text-xl font-bold text-slate-800">Available Apartments</h3>
                <Link href="/apartments" className="text-amber-600 text-sm font-semibold hover:text-amber-700">View all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {apartments.filter(a => a).map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setForm(f => ({ ...f, service: "apartment", roomSelection: apt.name }));
                      setStep("form");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-[#5A0E24] hover:shadow-md transition-all text-left group"
                  >
                    <div className="relative h-36">
                      <Image src={apt.image} alt={apt.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2">
                        <span className="bg-amber-500/90 text-white text-xs px-2 py-0.5 rounded-full font-semibold capitalize">{apt.type.replace("-", " ")}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-slate-800 text-sm">{apt.name}</p>
                      <p className="text-amber-600 font-bold text-sm mt-0.5">₦{apt.price.toLocaleString()}<span className="text-slate-400 font-normal">/night</span></p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ── Payment page ─────────────────────────────────────────────────────────────
  if (step === "payment" || step === "sending" || step === "done") {
    return (
      <div className="mt-16 md:mt-20">
        <div className="bg-[#5A0E24] py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Booking Request Received!</h1>
          <p className="text-white/80 text-sm">Your reference: <span className="font-bold text-white tracking-widest">{bookingRef}</span></p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {step === "done" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Receipt Sent!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">
                A payment receipt has been sent to <strong>{form.email}</strong>. Our team will verify your transfer and confirm your booking within 2 hours.
              </p>
              <p className="text-sm text-slate-400 mt-4">Redirecting you to the home page...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h2 className="text-base font-bold text-slate-800 mb-4 uppercase tracking-wide">Booking Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reference</span>
                      <span className="font-bold text-[#5A0E24]">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name</span>
                      <span className="font-medium text-slate-800">{form.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service</span>
                      <span className="font-medium text-slate-800">{serviceLabels[form.service] || form.service}</span>
                    </div>
                    {form.roomSelection && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Room</span>
                        <span className="font-medium text-slate-800">{form.roomSelection}</span>
                      </div>
                    )}
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
                  <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
                    Receipt will be sent to <span className="font-medium text-slate-700">{form.email}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">Complete Your Payment</h2>
                  <p className="text-slate-500 text-sm">Transfer the deposit to the account below, then click the button to confirm.</p>
                </div>

                <div className="bg-white rounded-2xl border-2 border-[#5A0E24]/20 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#5A0E24] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Bank Transfer Details</h3>
                      <p className="text-xs text-slate-500">Transfer your deposit to this account</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Bank Name", value: "Guaranty Trust Bank (GTBank)" },
                      { label: "Account Name", value: "PaNDiN Hotels Ltd" },
                      { label: "Account Number", value: "0123456789" },
                      { label: "Sort Code", value: "058-152-036" },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{item.label}</div>
                        <div className="font-bold text-slate-800 text-sm">{item.value}</div>
                      </div>
                    ))}
                    <div className="sm:col-span-2 bg-[#5A0E24]/5 rounded-xl p-4 border border-[#5A0E24]/15">
                      <div className="text-xs font-semibold text-[#5A0E24] uppercase tracking-wide mb-1">Payment Reference (Required)</div>
                      <div className="font-bold text-[#5A0E24] text-lg tracking-widest">{bookingRef}</div>
                      <div className="text-xs text-slate-500 mt-1">Include this in your transfer description so we can identify your payment.</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-4">What Happens Next?</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Transfer the deposit", desc: "Send payment to the GTBank account above using your reference as the description." },
                      { step: "2", title: "Click the button below", desc: "After transferring, click the confirm button — your receipt will be emailed instantly." },
                      { step: "3", title: "We verify & confirm", desc: "Our team verifies your payment within 2 hours and sends your official booking voucher." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#5A0E24] text-white text-sm font-bold flex items-center justify-center shrink-0">{s.step}</div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{s.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                  <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-amber-700">Booking held for <strong>24 hours</strong>. Not confirmed until payment is received. Call <strong>+234 (0) 705 442 2968</strong> for urgent help.</p>
                </div>

                {sendError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{sendError}</p>
                )}

                <button
                  onClick={handleTransferConfirm}
                  disabled={step === "sending"}
                  className="w-full py-4 bg-[#5A0E24] text-white font-bold rounded-xl hover:bg-[#921224] transition-colors shadow-md text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {step === "sending" ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending Receipt...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Yes, I Have Made the Transfer
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Booking form ──────────────────────────────────────────────────────────────
  return (
    <div>
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve your room, apartment, or event space at PaNDiN Group. Fast, simple, confirmed within 2 hours."
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book Now" }]}
        height="sm"
      />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Make a Reservation</h2>
                <p className="text-slate-500 text-sm mt-1">Fill in your details and we will confirm within 2 hours.</p>
              </div>
              <button type="button" onClick={() => setStep("select")} className="text-sm text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2">
                Change service
              </button>
            </div>

            {form.service && (
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800">{serviceLabels[form.service]}</p>
                  {form.roomSelection && <p className="text-xs text-amber-700">{form.roomSelection}</p>}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Taiwo Oyedokun"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Service *</label>
                <select name="service" value={form.service} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white text-slate-700">
                  <option value="">Select a service</option>
                  <option value="hotel">Hotel Room</option>
                  <option value="apartment">Luxury Apartment</option>
                  <option value="event-hall">Event Hall</option>
                  <option value="lounge-bar">DarNis Lounge / Pool Bar</option>
                  <option value="recreation">Recreation & Wellness</option>
                  <option value="other">Other / General Enquiry</option>
                </select>
              </div>
            </div>

            {(form.service === "hotel" || form.service === "apartment") && (
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  {form.service === "hotel" ? "Room Preference" : "Apartment Preference"}
                </label>
                <select name="roomSelection" value={form.roomSelection} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white text-slate-700">
                  <option value="">No preference / Let us suggest</option>
                  {form.service === "hotel" && hotelRooms.map(r => (
                    <option key={r.id} value={r.name}>{r.name} — ₦{r.price.toLocaleString()}/night ({r.capacity} guests)</option>
                  ))}
                  {form.service === "apartment" && apartments.map(a => (
                    <option key={a.id} value={a.name}>{a.name} — ₦{a.price.toLocaleString()}/night</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-in Date</label>
                <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-out Date</label>
                <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white">
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                  <option value="11+">11+ guests</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Special Requests</label>
              <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4}
                placeholder="Any special requirements, dietary needs, or requests..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none placeholder-slate-400" />
            </div>

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
              className="w-full py-3.5 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors shadow-md text-sm">
              Proceed to Payment →
            </button>
            <p className="text-xs text-slate-400 text-center">No charge until payment is confirmed · Booking held for 24 hours</p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#5A0E24] border-t-transparent rounded-full" /></div>}>
      <BookContent />
    </Suspense>
  );
}
