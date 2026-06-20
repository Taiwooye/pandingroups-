import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import HeroCarousel from "@/components/HeroCarousel";
import * as roomsApi from "@/services/endpoints/rooms";
import * as testimonialsApi from "@/services/endpoints/testimonials";
import { ApiRoom, ApiTestimonial } from "@/types";

export const dynamic = "force-dynamic";

const HERO_IMAGES = [
  {
    src: "https://pandin-group-production.up.railway.app/storage/gallery/exterior-1.jpg",
    alt: "PaNDiN Group - Exterior view",
  },
  {
    src: "https://pandin-group-production.up.railway.app/storage/gallery/exterior-2.jpg",
    alt: "PaNDiN Group - Entrance gate",
  },
  {
    src: "https://pandin-group-production.up.railway.app/storage/gallery/exterior-3.jpg",
    alt: "PaNDiN Group - Entrance reception",
  },
  {
    src: "https://pandin-group-production.up.railway.app/storage/gallery/exterior-4.jpg",
    alt: "PaNDiN Group - Interior lobby",
  },
];

const ROOM_FALLBACK = "https://pandin-group-production.up.railway.app/storage/gallery/hotel-1.jpg";

const stats = [
  { value: "3+", label: "Years of Excellence" },
  { value: "30", label: "Hotel Rooms" },
  { value: "50K+", label: "Happy Guests" },
  { value: "6", label: "Business Offerings" },
];

const amenities = [
  { icon: "🏊", title: "Swimming Pool", desc: "Resort-style outdoor pool available for all guests" },
  { icon: "🏋️", title: "Fitness Center", desc: "Modern gym facilities — coming soon" },
  { icon: "🎱", title: "Billiards & Snooker", desc: "Full games room with billiards, snooker & table tennis" },
  { icon: "🍽️", title: "DarNis Lounge", desc: "Fine dining, signature cocktails and premium spirits" },
  { icon: "🛎️", title: "24/7 Concierge", desc: "Personal concierge at your service always" },
  { icon: "🚗", title: "Free Parking", desc: "Secure ample parking for all guests" },
  { icon: "🎉", title: "Event Hall", desc: "Nwando's Hall for up to 500 guests" },
  { icon: "📶", title: "High-Speed Wi-Fi", desc: "Complimentary Wi-Fi throughout" },
];

const promotions = [
  {
    icon: "🍽️",
    title: "Dine on Us",
    desc: "Book 2 nights in a hotel room or apartment and receive 2 complimentary dinner or breakfast meals.",
    badge: "Hotel & Apartment",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🏋️",
    title: "Free Gym Week",
    desc: "Book a 5–7 day apartment stay and receive 1 free week of gym use when our gym opens.",
    badge: "Apartments Only",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🎁",
    title: "10% Online Discount",
    desc: "Get 10% off any hotel stay or event booking made online before July 2026. Book early, save more.",
    badge: "Limited Time",
    color: "bg-[#5A0E24]/5 border-[#5A0E24]/20",
    badgeColor: "bg-[#5A0E24]/10 text-[#5A0E24]",
  },
];

export default async function HomePage() {
  let featuredRooms: ApiRoom[] = [];
  let liveTestimonials: ApiTestimonial[] = [];
  try {
    const [roomsResult, testimonialsResult] = await Promise.allSettled([
      roomsApi.list(),
      testimonialsApi.list(),
    ]);
    if (roomsResult.status === "fulfilled") featuredRooms = (roomsResult.value.data ?? []).slice(0, 3);
    if (testimonialsResult.status === "fulfilled") liveTestimonials = testimonialsResult.value.data ?? [];
  } catch {
    // keep defaults
  }

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel images={HERO_IMAGES} />

      {/* Stats */}
      <section className="bg-[#5A0E24] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-rose-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Everything You Need</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              From luxurious rooms to spectacular event spaces — PaNDiN Group has it all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard title="Hotel Rooms" description="Luxurious rooms and suites with premium amenities for business and leisure." image="https://pandin-group-production.up.railway.app/storage/gallery/hotel-1.jpg" href="/hotel" badge="From ₦28,000/night" />
            <ServiceCard title="Apartments" description="Fully furnished serviced apartments for short and long-term stays." image="https://pandin-group-production.up.railway.app/storage/gallery/hotel-3.jpg" href="/apartments" badge="From ₦100,000/night" />
            <ServiceCard title="Event Hall" description="Spectacular venues for weddings, conferences, and unforgettable events." image="https://pandin-group-production.up.railway.app/storage/gallery/exterior-1.jpg" href="/event-hall" badge="Up to 500 guests" />
            <ServiceCard title="Lounge & Bar" description="Signature cocktails, fine spirits, and premium ambiance in our exclusive lounges." image="https://pandin-group-production.up.railway.app/storage/gallery/exterior-4.jpg" href="/lounge-bar" badge="Open Nightly" />
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Rooms & Suites</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Featured Accommodations</h2>
            </div>
            <Link href="/hotel" className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1.5 shrink-0">
              View All Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => {
              const image = room.media[0]?.url ?? room.media[1]?.url ?? ROOM_FALLBACK;
              const price = parseFloat(room.price_per_night);
              return (
                <div key={room.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-[#5A0E24]/90 text-white text-xs font-semibold rounded-full uppercase">{room.category.label}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{room.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{room.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-amber-700">₦{price.toLocaleString()}</span>
                        <span className="text-sm text-slate-400 ml-1">/ night</span>
                      </div>
                      <Link href={`/hotel/${room.slug}`} className="px-4 py-2 bg-[#5A0E24] text-white text-sm font-semibold rounded-lg hover:bg-[#921224] transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">World-Class Facilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Premium Amenities</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Every detail is designed to elevate your stay to the highest standard of comfort and luxury.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((a) => (
              <div key={a.title} className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-1">{a.title}</h3>
                <p className="text-sm text-slate-500">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Promotions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Limited Offers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Special Promotions</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Exclusive deals for guests who book directly. Don&apos;t miss out.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((p) => (
              <div key={p.title} className={`rounded-2xl border p-6 ${p.color}`}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${p.badgeColor}`}>{p.badge}</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/book" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors shadow-md">
              Book Now to Claim Your Offer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-xs text-slate-400 mt-3">10% online discount valid for bookings made before July 2026</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Guest Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveTestimonials.slice(0, 3).map((t) => {
              const initials = t.reviewer_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              const formattedDate = new Date(t.review_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
              return (
                <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.review_text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    {t.reviewer_image_url ? (
                      <Image src={t.reviewer_image_url} alt={t.reviewer_name} width={40} height={40} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#5A0E24] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">{initials}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{t.reviewer_name}</div>
                      <div className="text-xs text-slate-500">{t.reviewer_role} · {formattedDate}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <Image src="https://pandin-group-production.up.railway.app/storage/gallery/exterior-2.jpg" alt="Book your stay" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#921224]/80" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for an Unforgettable Experience?</h2>
          <p className="text-white/80 text-lg mb-8">
            Book your stay at PaNDiN Group today and enjoy exclusive rates, complimentary offers, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-8 py-3.5 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors shadow-lg">
              Make a Reservation
            </Link>
            <Link href="/hotel" className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors">
              Browse Rooms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
