"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import DatePicker from "@/components/DatePicker";
import * as bookingsApi from "@/services/endpoints/bookings";

// YYYY-MM-DD in the visitor's local time zone
function toDateInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return toDateInput(new Date(y, m - 1, d + days));
}

const SERVICE_LABELS: Record<string, string> = {
  hotel: "Hotel Room",
  apartment: "Apartment",
  "event-hall": "Event Hall",
  "lounge-bar": "Lounge & Bar",
  dining: "Dining",
  other: "General Enquiry",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const today = toDateInput(new Date());
  const minCheckOut = addDays(form.checkIn || today, 1);

  const updateField = (name: string, value: string) => {
    const next = { ...form, [name]: value };
    // Clear check-out if the new check-in is on or after it
    if (name === "checkIn" && next.checkOut && value && next.checkOut <= value) next.checkOut = "";
    setForm(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(e.target.name, e.target.value);
  };

  const validateDates = (): string => {
    if (form.checkIn && form.checkIn < today) return "Check-in date cannot be in the past.";
    if (form.checkOut && !form.checkIn) return "Please select a check-in date.";
    if (form.checkOut && form.checkOut <= form.checkIn) return "Check-out date must be after the check-in date.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateError = validateDates();
    if (dateError) {
      setSubmitError(dateError);
      return;
    }
    setSubmitError("");
    setSending(true);

    // General enquiries only store name, email, phone and message,
    // so the reservation details are included in the message for staff.
    const details = [
      form.service && `Service: ${SERVICE_LABELS[form.service] ?? form.service}`,
      form.checkIn && `Check-in: ${form.checkIn}`,
      form.checkOut && `Check-out: ${form.checkOut}`,
      form.guests && `Guests: ${form.guests}`,
    ].filter(Boolean);
    const message = [details.join("\n"), form.message.trim()].filter(Boolean).join("\n\n");

    try {
      const result = await bookingsApi.create({
        service_type: "general",
        guest_name: form.name.trim(),
        guest_email: form.email.trim(),
        guest_phone: form.phone.trim() || undefined,
        message: message || undefined,
      });
      setBookingRef(result?.data?.booking_ref ?? "");
      setSubmitted(true);
    } catch {
      setSubmitError("We could not send your enquiry. Please check your connection and try again, or call +234 (0) 705 442 2968.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Contact & Reservations"
        subtitle="We&apos;d love to hear from you. Reach out to make a reservation or enquire about our services."
        image="/images/gallery/exterior-2.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        height="sm"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-wine mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: (
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      title: "Our Location",
                      detail: "Iyana Church, Off Iwo Road, Ibadan, Oyo State 200108, Nigeria",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                      title: "Phone",
                      detail: "+234 (0) 705 442 2968",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                      title: "Email",
                      detail: "pandinhotels@gmail.com",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Check-in / Check-out",
                      detail: "Check-in: 2:00 PM · Check-out: 12:00 PM",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{item.title}</div>
                        <div className="text-sm text-slate-700">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative h-52 rounded-xl overflow-hidden bg-cream">
                <Image
                  src="/images/gallery/exterior-3.jpg"
                  alt="PaNDiN Group entrance"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-lg px-4 py-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-[#5A0E24] flex items-center justify-center mx-auto mb-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">PandinGroups Hotel</p>
                    <p className="text-xs text-slate-500">Iyana Church, Ibadan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-wine mb-3">Enquiry Received!</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                      Thank you for reaching out. Our team will contact you within 2 hours to confirm your booking or answer your enquiry.
                    </p>
                    {bookingRef && (
                      <p className="text-sm text-slate-500 mt-4">
                        Your reference: <span className="font-bold text-slate-800">{bookingRef}</span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-serif font-semibold text-wine mb-2">Make a Reservation</h2>
                  <p className="text-slate-500 text-sm mb-6">Fill in the form below and our team will get back to you promptly.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Service Interested In *</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white text-slate-700"
                      >
                        <option value="">Select a service</option>
                        <option value="hotel">Hotel Room</option>
                        <option value="apartment">Apartment</option>
                        <option value="event-hall">Event Hall</option>
                        <option value="lounge-bar">Lounge & Bar</option>
                        <option value="dining">Dining</option>
                        <option value="other">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-in Date</span>
                      <DatePicker
                        value={form.checkIn}
                        onChange={(v) => updateField("checkIn", v)}
                        min={today}
                        rangeStart={form.checkIn}
                        rangeEnd={form.checkOut}
                        ariaLabel="Check-in date"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-out Date</span>
                      <DatePicker
                        value={form.checkOut}
                        onChange={(v) => updateField("checkOut", v)}
                        min={minCheckOut}
                        rangeStart={form.checkIn}
                        rangeEnd={form.checkOut}
                        ariaLabel="Check-out date"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Number of Guests</label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white"
                      >
                        <option value="">Select</option>
                        {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
                        <option value="9+">9+ guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Message / Special Requests</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about any special requests, dietary requirements, or questions..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none placeholder-slate-400"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-wine w-full py-3.5 font-semibold rounded-full shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : "Send Enquiry"}
                  </button>
                  <p className="text-xs text-slate-400 text-center">We respond within 2 hours during business hours (8 AM – 10 PM)</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
