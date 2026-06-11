"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import roomsData from "@/data/hotel-rooms.json";
import apartmentsData from "@/data/apartments.json";

// Types

type HotelRoom = {
  id: string; name: string; price: number; image: string;
  category: string; capacity: number; description: string;
  features: string[]; size?: number;
};
type Apartment = {
  id: string; name: string; price: number; image: string;
  type: string; bedrooms: number; bathrooms?: number;
  description: string; features: string[];
};

type Step = "services" | "properties" | "details" | "payment" | "sending" | "done";

type FormData = {
  title: string; firstName: string; lastName: string;
  countryCode: string; phone: string; email: string;
  service: string; selectedId: string; selectedName: string; selectedPrice: number; selectedImage: string;
  checkIn: string; checkOut: string; guests: string; specialRequests: string;
};

// Static data

const hotelRooms = roomsData as HotelRoom[];
const apartments = apartmentsData as Apartment[];

const SERVICES = [
  { key: "hotel",      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5", label: "Hotel Room",        desc: "Nkrumah, Fela, Zik, Mandela Suite",   from: "From ₦28,000/night", color: "bg-[#5A0E24]" },
  { key: "apartment",  icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",                          label: "Luxury Apartment",  desc: "1-BR, 2-BR, 3-BR & 4-BR units",      from: "From ₦100,000/night", color: "bg-amber-600" },
  { key: "event-hall", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",       label: "Event Hall",        desc: "Nwando's Hall — up to 500 guests", from: "₦400,000/day",      color: "bg-blue-700" },
  { key: "other",      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "General Enquiry",   desc: "Not sure? We will help you choose",  from: "Contact us",           color: "bg-slate-600" },
];

const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1",   flag: "🇺🇸", name: "USA" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
];

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

function generateRef() {
  return "PDG-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

// SummaryPanel

function SummaryPanel({ form }: { form: FormData }) {
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = nights > 0 && form.selectedPrice > 0 ? nights * form.selectedPrice : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
      {form.selectedImage && (
        <div className="relative h-44 w-full">
          <Image src={form.selectedImage} alt={form.selectedName} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-bold text-slate-800 text-base">{form.selectedName || "No property selected"}</h3>
        {form.service && (
          <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#5A0E24]/10 text-[#5A0E24] capitalize">
            {SERVICES.find((s) => s.key === form.service)?.label}
          </span>
        )}

        {form.selectedPrice > 0 && (
          <p className="text-xl font-black text-amber-700 mt-3">
            &#8358;{form.selectedPrice.toLocaleString()}
            <span className="text-sm font-normal text-slate-400">/night</span>
          </p>
        )}

        <div className="mt-4 space-y-2.5 text-sm border-t border-slate-100 pt-4">
          {form.checkIn && (
            <div className="flex justify-between">
              <span className="text-slate-500">Check-in</span>
              <span className="font-semibold text-slate-800">{new Date(form.checkIn).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
          )}
          {form.checkOut && (
            <div className="flex justify-between">
              <span className="text-slate-500">Check-out</span>
              <span className="font-semibold text-slate-800">{new Date(form.checkOut).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
          )}
          {nights > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">Duration</span>
              <span className="font-semibold text-slate-800">{nights} night{nights !== 1 ? "s" : ""}</span>
            </div>
          )}
          {form.guests && (
            <div className="flex justify-between">
              <span className="text-slate-500">Guests</span>
              <span className="font-semibold text-slate-800">{form.guests}</span>
            </div>
          )}
        </div>

        {total !== null && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">Estimated Total</span>
              <span className="text-lg font-black text-[#5A0E24]">&#8358;{total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Deposit required to confirm booking</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Secure booking &middot; Confirmed in 2 hrs
        </div>
      </div>
    </div>
  );
}

// Main component

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get("service") || "";
  const preId = searchParams.get("id") || "";

  const [bookingRef] = useState(generateRef);
  const [sendError, setSendError] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const [form, setForm] = useState<FormData>(() => {
    const preloaded =
      preService === "hotel" && preId
        ? hotelRooms.find((r) => r.id === preId)
        : preService === "apartment" && preId
        ? apartments.find((a) => a.id === preId)
        : undefined;

    return {
      title: "", firstName: "", lastName: "",
      countryCode: "+234", phone: "", email: "",
      service: preService,
      selectedId: preloaded?.id ?? "",
      selectedName: preloaded?.name ?? "",
      selectedPrice: preloaded?.price ?? 0,
      selectedImage: preloaded?.image ?? "",
      checkIn: "", checkOut: "", guests: "", specialRequests: "",
    };
  });

  const hasPreloaded = !!(preId && form.selectedId);

  const [step, setStep] = useState<Step>(() => {
    if (preService === "hotel" || preService === "apartment") {
      return preId ? "details" : "properties";
    }
    return preService ? "details" : "services";
  });

  const set = (p: Partial<FormData>) => setForm((f) => ({ ...f, ...p }));

  const serviceProperties = useMemo(() => {
    if (form.service === "hotel") return hotelRooms;
    if (form.service === "apartment") return apartments;
    return [];
  }, [form.service]);

  const canProceedDetails = !!(form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.phone.trim());

  function selectService(key: string) {
    set({ service: key, selectedId: "", selectedName: "", selectedPrice: 0, selectedImage: "" });
    if (key === "hotel" || key === "apartment") {
      setStep("properties");
    } else {
      setStep("details");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectProperty(id: string, name: string, price: number, image: string) {
    set({ selectedId: id, selectedName: name, selectedPrice: price, selectedImage: image });
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleProceed(e: React.FormEvent) {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleTransferConfirm = useCallback(async () => {
    setSendError("");
    setStep("sending");
    try {
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.title} ${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: `${form.countryCode}${form.phone}`,
          service: form.service,
          roomSelection: form.selectedName,
          checkIn: form.checkIn, checkOut: form.checkOut,
          guests: form.guests, specialRequests: form.specialRequests,
          bookingRef,
        }),
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

  // Step: Services

  if (step === "services") {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-[#5A0E24] py-20 text-center px-4">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">PaNDiN Group</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Book Your Experience</h1>
          <p className="text-white/70 text-base max-w-md mx-auto">Choose a service below and we will walk you through the rest.</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <button
                key={s.key}
                onClick={() => selectService(s.key)}
                className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-[#5A0E24] hover:shadow-xl transition-all duration-200 text-left group flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-[#5A0E24] transition-colors">{s.label}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-snug">{s.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                  <span className="text-amber-600 font-semibold text-xs">{s.from}</span>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-[#5A0E24] transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step: Properties

  if (step === "properties") {
    const svc = SERVICES.find((s) => s.key === form.service);
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-100 px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button onClick={() => setStep("services")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${svc?.color} flex items-center justify-center`}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={svc?.icon} />
                </svg>
              </div>
              <span className="font-semibold text-slate-800 text-sm">{svc?.label}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Select your {svc?.label}</h2>
            <p className="text-slate-500 text-sm mt-1">Click a property to view details and proceed to booking.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(serviceProperties as (HotelRoom | Apartment)[]).map((item) => {
              const room = item as HotelRoom;
              const apt = item as Apartment;
              const isHotel = form.service === "hotel";
              const badge = isHotel ? room.category : apt.type?.replace("-", " ");
              const capacity = isHotel ? `Up to ${room.capacity} guests` : `${apt.bedrooms} bed${apt.bedrooms > 1 ? "s" : ""}`;

              return (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:border-[#5A0E24]/30 transition-all duration-300 flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#5A0E24] text-white text-xs font-bold px-2.5 py-1 rounded-full capitalize">
                      {badge}
                    </span>
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      Available
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {capacity}
                      </span>
                      {(item as HotelRoom).size && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          {(item as HotelRoom).size} m&sup2;
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{f}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-xl font-black text-amber-700">&#8358;{item.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 ml-1">/night</span>
                      </div>
                      <button
                        onClick={() => selectProperty(item.id, item.name, item.price, item.image)}
                        className="px-4 py-2 bg-[#5A0E24] text-white text-xs font-bold rounded-xl hover:bg-[#921224] transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step: Details

  if (step === "details") {
    const svc = SERVICES.find((s) => s.key === form.service);
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-100 px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button
              onClick={() => {
                if (hasPreloaded) {
                  router.back();
                } else {
                  setStep(form.service === "hotel" || form.service === "apartment" ? "properties" : "services");
                }
              }}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-sm text-slate-500">
              {svc?.label}{form.selectedName ? ` · ${form.selectedName}` : ""}
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleProceed} className="space-y-8">

                {/* Personal details */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Your personal details</h2>
                    <p className="text-xs text-slate-400 mt-1">We&apos;ll use these to send your booking confirmation.</p>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Title</label>
                      <select
                        value={form.title}
                        onChange={(e) => set({ title: e.target.value })}
                        className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white text-slate-700"
                      >
                        <option value="">&mdash;</option>
                        {TITLES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="col-span-9 sm:col-span-4">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">First name *</label>
                      <input
                        type="text" required value={form.firstName}
                        onChange={(e) => set({ firstName: e.target.value })}
                        placeholder="e.g. Taiwo"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-300"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Last name *</label>
                      <input
                        type="text" required value={form.lastName}
                        onChange={(e) => set({ lastName: e.target.value })}
                        placeholder="e.g. Oyedokun"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Country code</label>
                      <select
                        value={form.countryCode}
                        onChange={(e) => set({ countryCode: e.target.value })}
                        className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white text-slate-700"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-8">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Phone number *</label>
                      <input
                        type="tel" required value={form.phone}
                        onChange={(e) => set({ phone: e.target.value })}
                        placeholder="800 000 0000"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">E-mail address *</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => set({ email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-slate-300"
                    />
                  </div>
                </div>

                {/* Stay details */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
                  <h2 className="text-lg font-bold text-slate-800">Stay details</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-in</label>
                      <input type="date" value={form.checkIn} onChange={(e) => set({ checkIn: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Check-out</label>
                      <input type="date" value={form.checkOut} onChange={(e) => set({ checkOut: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Guests</label>
                      <select value={form.guests} onChange={(e) => set({ guests: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white">
                        <option value="">Select</option>
                        {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>)}
                        <option value="11+">11+ guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Special Requests</label>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) => set({ specialRequests: e.target.value })}
                      rows={3}
                      placeholder="Any special requirements, dietary needs, or requests..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none placeholder-slate-300"
                    />
                  </div>
                </div>

                {/* Guest Policies */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-lg font-bold text-slate-800">Guest Policies</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-semibold text-[#5A0E24] text-sm mb-2">Cancellation</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Cancellations attract a <strong className="text-slate-700">25% fee</strong> of the total amount paid. Refunds are processed within 72 hours via the original payment method.</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-semibold text-amber-600 text-sm mb-2">Refund Policy</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Refunds are returned through the original payment method and may take <strong className="text-slate-700">48&ndash;72 hours</strong> to reflect.</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="font-semibold text-slate-700 text-sm mb-2">Damage Policy</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Charges apply for damages during your stay (e.g. stained linen &#8358;10,000, lost key card &#8358;10,000). <a href="/policies" className="text-[#5A0E24] underline hover:no-underline">View full schedule</a>.</p>
                    </div>
                  </div>

                  {/* Agreement checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group mt-2">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={agreedToPolicy}
                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 rounded border-2 border-slate-300 peer-checked:bg-[#5A0E24] peer-checked:border-[#5A0E24] transition-colors flex items-center justify-center">
                        {agreedToPolicy && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 leading-snug">
                      I have read and agree to the <strong className="text-slate-800">Guest Policies</strong> above, including the cancellation, refund, and damage policies.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!canProceedDetails || !agreedToPolicy}
                  className="w-full py-4 bg-[#5A0E24] text-white font-bold rounded-2xl hover:bg-[#921224] transition-colors shadow-md text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="text-xs text-slate-400 text-center">No charge until payment is confirmed &middot; Booking held for 24 hours</p>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <SummaryPanel form={form} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step: Done

  if (step === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Receipt Sent!</h2>
          <p className="text-slate-500 text-sm">A confirmation receipt has been sent to <strong>{form.email}</strong>. We will verify your payment and confirm within 2 hours.</p>
          <p className="text-xs text-slate-400 mt-4">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  // Step: Payment

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#5A0E24] py-10 text-center px-4">
        <p className="text-white/70 text-sm mb-2">Booking Reference</p>
        <h1 className="text-2xl font-black text-white tracking-widest">{bookingRef}</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SummaryPanel form={form} />
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-sm space-y-3">
              <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wide">Guest Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-medium">{form.title} {form.firstName} {form.lastName}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Phone</span><span className="font-medium">{form.countryCode}{form.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="font-medium truncate max-w-32">{form.email}</span></div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Complete Your Payment</h2>
              <p className="text-slate-500 text-sm mt-1">Transfer the deposit to the account below, then click confirm.</p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#5A0E24]/20 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#5A0E24]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Bank Transfer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <div className="font-bold text-[#5A0E24] text-xl tracking-widest">{bookingRef}</div>
                  <div className="text-xs text-slate-500 mt-1">Include this in your transfer description so we can identify your payment.</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">What Happens Next?</h3>
              {[
                { n: "1", title: "Transfer the deposit", desc: "Send payment to the GTBank account above using your booking reference." },
                { n: "2", title: "Click confirm below", desc: "After transferring, click the button — your receipt will be emailed instantly." },
                { n: "3", title: "We verify & confirm", desc: "Our team confirms your payment within 2 hours and sends your booking voucher." },
              ].map((s) => (
                <div key={s.n} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#5A0E24] text-white text-xs font-bold flex items-center justify-center shrink-0">{s.n}</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
              className="w-full py-4 bg-[#5A0E24] text-white font-bold rounded-2xl hover:bg-[#921224] transition-colors shadow-md text-base disabled:opacity-60 flex items-center justify-center gap-3"
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
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#5A0E24] border-t-transparent rounded-full" />
      </div>
    }>
      <BookContent />
    </Suspense>
  );
}
