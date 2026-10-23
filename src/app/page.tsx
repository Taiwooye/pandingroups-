import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHeading from "@/components/SectionHeading";
import * as roomsApi from "@/services/endpoints/rooms";
import * as testimonialsApi from "@/services/endpoints/testimonials";
import * as galleryApi from "@/services/endpoints/gallery";
import * as promotionsApi from "@/services/endpoints/promotions";
import { ApiGalleryItem, ApiPromotion, ApiRoom, ApiTestimonial } from "@/types";

export const dynamic = "force-dynamic";

const HERO_IMAGES = [
  {
    src: "/images/gallery/exterior-1.jpg",
    alt: "PaNDiN Group - Exterior view",
  },
  {
    src: "/images/gallery/exterior-2.jpg",
    alt: "PaNDiN Group - Entrance gate",
  },
  {
    src: "/images/gallery/exterior-3.jpg",
    alt: "PaNDiN Group - Entrance reception",
  },
  {
    src: "/images/gallery/exterior-4.jpg",
    alt: "PaNDiN Group - Interior lobby",
  },
];

const ROOM_FALLBACK = "/images/gallery/hotel-1.jpg";

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

// Card accents, cycled across promotions in display order
const PROMOTION_STYLES = [
  { ring: "from-gold-light via-gold to-gold-dark", badge: "bg-gold/15 text-gold-dark" },
  { ring: "from-primary via-primary-dark to-wine", badge: "bg-primary/10 text-primary" },
  { ring: "from-gold-dark via-gold to-gold-light", badge: "bg-wine/10 text-wine" },
];

export default async function HomePage() {
  let featuredRooms: ApiRoom[] = [];
  let liveTestimonials: ApiTestimonial[] = [];
  let heroImages = HERO_IMAGES;
  let promotions: ApiPromotion[] = [];
  try {
    const [roomsResult, testimonialsResult, galleryResult, promotionsResult] = await Promise.allSettled([
      roomsApi.list(),
      testimonialsApi.list(),
      galleryApi.list({ category: "exterior" }),
      promotionsApi.list(),
    ]);
    if (promotionsResult.status === "fulfilled") {
      promotions = (promotionsResult.value.data ?? []).sort(
        (a: ApiPromotion, b: ApiPromotion) => a.sort_order - b.sort_order
      );
    }
    if (roomsResult.status === "fulfilled") featuredRooms = (roomsResult.value.data ?? []).slice(0, 3);
    if (testimonialsResult.status === "fulfilled") liveTestimonials = testimonialsResult.value.data ?? [];
    if (galleryResult.status === "fulfilled") {
      const items: ApiGalleryItem[] = (galleryResult.value.data ?? []).filter(
        (g: ApiGalleryItem) => g.type.value === "image"
      );
      if (items.length > 0) {
        heroImages = items.map((g) => ({ src: g.url, alt: g.alt_text ?? "PaNDiN Group" }));
      }
    }
  } catch {
    // keep defaults
  }

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel images={heroImages} />

      {/* Stats */}
      <section className="relative bg-wine-gradient py-14 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/10">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 120} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-semibold text-gold-gradient mb-2">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/70">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeading
              eyebrow="Our Offerings"
              title="Everything You Need"
              subtitle="From luxurious rooms to spectacular event spaces — PaNDiN Group has it all under one roof."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Hotel Rooms", description: "Luxurious rooms and suites with premium amenities for business and leisure.", image: "/images/gallery/hotel-1.jpg", href: "/hotel", badge: "From ₦28,000/night" },
              { title: "Apartments", description: "Fully furnished serviced apartments for short and long-term stays.", image: "/images/gallery/hotel-3.jpg", href: "/apartments", badge: "From ₦100,000/night" },
              { title: "Event Hall", description: "Spectacular venues for weddings, conferences, and unforgettable events.", image: "/images/gallery/exterior-1.jpg", href: "/event-hall", badge: "Up to 500 guests" },
              { title: "Lounge & Bar", description: "Signature cocktails, fine spirits, and premium ambiance in our exclusive lounges.", image: "/images/gallery/exterior-4.jpg", href: "/lounge-bar", badge: "Open Nightly" },
            ].map((service, i) => (
              <Reveal key={service.href} delay={i * 120}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-6">
            <SectionHeading eyebrow="Rooms & Suites" title="Featured Accommodations" align="left" />
            <Reveal>
              <Link href="/hotel" className="group inline-flex items-center gap-2 text-primary font-semibold shrink-0">
                <span className="border-b border-gold pb-0.5">View All Rooms</span>
                <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => {
              const image = room.media[0]?.url ?? room.media[1]?.url ?? ROOM_FALLBACK;
              const price = parseFloat(room.price_per_night);
              return (
                <Reveal key={room.slug} delay={i * 150}>
                  <div className="card-luxe bg-white rounded-3xl overflow-hidden border border-cream-dark shadow-sm group h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <Image src={image} alt={room.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-primary text-[11px] font-semibold rounded-full uppercase tracking-wider">
                        {room.category.label}
                      </span>
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="font-serif text-2xl font-semibold">₦{price.toLocaleString()}</span>
                        <span className="text-sm text-white/75 ml-1">/ night</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-serif text-2xl font-semibold text-wine mb-2">{room.name}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{room.description}</p>
                      <Link href={`/hotel/${room.slug}`} className="btn-wine inline-flex justify-center px-5 py-3 text-sm font-semibold rounded-full">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="relative py-24 bg-cream-gradient overflow-hidden">
        <div className="absolute -right-24 top-10 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeading
              eyebrow="World-Class Facilities"
              title="Premium Amenities"
              subtitle="Every detail is designed to elevate your stay to the highest standard of comfort and luxury."
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {amenities.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 100}>
                <div className="card-luxe group h-full bg-white/80 backdrop-blur rounded-2xl p-6 text-center border border-white shadow-sm">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-cream to-cream-dark ring-1 ring-gold/40 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:ring-gold transition-all duration-500">
                    {a.icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-wine mb-1">{a.title}</h3>
                  <p className="text-sm text-slate-500">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Promotions */}
      {promotions.length > 0 && (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeading
              eyebrow="Limited Offers"
              title="Special Promotions"
              subtitle="Exclusive deals for guests who book directly. Don't miss out."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((p, i) => {
              const style = PROMOTION_STYLES[i % PROMOTION_STYLES.length];
              return (
                <Reveal key={p.id} delay={i * 150}>
                  <div className={`card-luxe h-full rounded-3xl p-px bg-gradient-to-br ${style.ring}`}>
                    <div className="h-full rounded-[calc(1.5rem-1px)] bg-white p-7">
                      {p.icon && <div className="text-4xl mb-5">{p.icon}</div>}
                      {p.badge && (
                        <span className={`inline-block px-3 py-1 text-[11px] font-semibold rounded-full uppercase tracking-wider mb-4 ${style.badge}`}>{p.badge}</span>
                      )}
                      <h3 className="font-serif text-2xl font-semibold text-wine mb-3">{p.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="text-center mt-12">
            <Link href="/book" className="btn-wine inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full shadow-md">
              Book Now to Claim Your Offer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
      )}

      {/* Testimonials */}
      {liveTestimonials.length > 0 && (
      <section className="relative py-24 bg-wine-gradient overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeading eyebrow="Guest Reviews" title="What Our Guests Say" light />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveTestimonials.slice(0, 3).map((t, i) => {
              const initials = t.reviewer_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
              const formattedDate = new Date(t.review_date).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
              return (
                <Reveal key={t.id} delay={i * 150}>
                  <div className="relative h-full rounded-3xl p-7 bg-white/[0.07] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-gold/40 transition-colors duration-500">
                    <span className="absolute top-3 right-6 font-serif text-7xl leading-none text-gold/30 select-none" aria-hidden>&rdquo;</span>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 fill-gold" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-serif text-lg text-white/90 leading-relaxed mb-6 italic">&ldquo;{t.review_text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                      {t.reviewer_image_url ? (
                        <Image src={t.reviewer_image_url} alt={t.reviewer_name} width={44} height={44} className="rounded-full object-cover ring-2 ring-gold/50" />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                          <span className="text-wine-deep text-xs font-bold">{initials}</span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white text-sm">{t.reviewer_name}</div>
                        <div className="text-xs text-white/55">{t.reviewer_role} · {formattedDate}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <Image src="/images/gallery/exterior-2.jpg" alt="Book your stay" fill sizes="100vw" className="object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-wine-deep/95 via-primary/85 to-wine-deep/90" />
        <Reveal className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Reserve Your Stay</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mt-4 mb-5 leading-tight">
            Ready for an <span className="italic text-gold-gradient">Unforgettable</span> Experience?
          </h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/75 text-lg mb-10">
            Book your stay at PaNDiN Group today and enjoy exclusive rates, complimentary offers, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-gold px-8 py-4 font-semibold rounded-full shadow-lg">
              Make a Reservation
            </Link>
            <Link href="/hotel" className="px-8 py-4 text-white font-semibold rounded-full border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-gold-light transition-colors">
              Browse Rooms
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
