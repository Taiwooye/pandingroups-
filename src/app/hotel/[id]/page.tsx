import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as roomsApi from "@/services/endpoints/rooms";
import * as policiesApi from "@/services/endpoints/policies";
import { ApiDamageCharge, ApiPolicy, ApiRoom } from "@/types";
import BookingSidebar from "@/components/BookingSidebar";
import PolicyCards from "@/components/PolicyCards";

const FALLBACK_IMAGE = "/images/gallery/hotel-1.jpg";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/hotel/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  try {
    const result = await roomsApi.getBySlug(id);
    const room: ApiRoom = result.data;
    return { title: room.name, description: room.description };
  } catch {
    return {};
  }
}

export default async function HotelRoomPage(props: PageProps<"/hotel/[id]">) {
  const { id } = await props.params;

  let room: ApiRoom;
  try {
    const result = await roomsApi.getBySlug(id);
    room = result.data;
    if (!room) notFound();
  } catch {
    notFound();
  }

  let policies: ApiPolicy[] = [];
  let damageCharges: ApiDamageCharge[] = [];
  const [policiesResult, chargesResult] = await Promise.allSettled([
    policiesApi.list(),
    policiesApi.listDamageCharges(),
  ]);
  if (policiesResult.status === "fulfilled") policies = policiesResult.value.data ?? [];
  if (chargesResult.status === "fulfilled") damageCharges = chargesResult.value.data ?? [];

  const heroImage = room.media[0]?.url ?? room.media[1]?.url ?? FALLBACK_IMAGE;
  const gallery = room.media.slice(0, 5).map((m) => m.url);
  const price = parseFloat(room.price_per_night);
  const isAvailable = room.available_count > 0;
  const related = room.related ?? [];

  return (
    <div className="mt-16 md:mt-20">
      {/* Hero Image */}
      <div className="relative h-80 md:h-[28rem] lg:h-[540px] overflow-hidden bg-wine-deep">
        <Image src={heroImage} alt={room.name} fill className="object-cover animate-ken-burns" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/50 to-wine-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-deep/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
          <nav className="hero-enter flex items-center gap-2 mb-4 text-sm">
            <Link href="/" className="text-gold-light hover:text-white">Home</Link>
            <span className="text-gold/60">/</span>
            <Link href="/hotel" className="text-gold-light hover:text-white">Hotel</Link>
            <span className="text-gold/60">/</span>
            <span className="text-white/70">{room.name}</span>
          </nav>
          <h1 className="hero-enter font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight" style={{ "--enter-delay": "150ms" } as React.CSSProperties}>{room.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status & Category */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {isAvailable ? "✓ Available" : "✗ Currently Booked"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 capitalize">
                {room.category.label}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-serif font-semibold text-wine mb-3">About This Room</h2>
              <p className="text-slate-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Capacity", value: `${room.max_guests} guests`, icon: "👥" },
                ...(room.size_sqm ? [{ label: "Room Size", value: `${room.size_sqm} m²`, icon: "📐" }] : []),
                { label: "Category", value: room.category.label, icon: "⭐" },
                { label: "Available", value: `${room.available_count} of ${room.total_count}`, icon: "🛏️" },
              ].map((d) => (
                <div key={d.label} className="bg-cream rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{d.icon}</div>
                  <div className="font-bold text-slate-800 capitalize">{d.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{d.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            {room.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-semibold text-wine mb-4">Room Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {room.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-semibold text-wine mb-4">In-Room Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span key={a} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {room.facilities && room.facilities.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-semibold text-wine mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((f) => (
                    <span key={f} className="px-3 py-1.5 bg-cream border border-gold/30 rounded-lg text-sm text-gold-dark shadow-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div className="bg-cream rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-serif font-semibold text-wine">Guest Policies</h2>
              <PolicyCards policies={policies} damageCharges={damageCharges} />
            </div>

            {/* Gallery */}
            {gallery.length > 1 && (
              <div>
                <h2 className="text-xl font-serif font-semibold text-wine mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${room.name} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              slug={room.slug}
              service="hotel"
              price={price}
              maxGuests={room.max_guests}
              isAvailable={isAvailable}
              benefits={["25% cancellation fee applies", "Complimentary breakfast", "24/7 room service"]}
            />
          </div>
        </div>

        {/* Related Rooms */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-cream-dark">
            <h2 className="text-2xl font-serif font-semibold text-wine mb-8">Other Rooms You May Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r.slug} className="card-luxe bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark group">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={r.first_media_url || FALLBACK_IMAGE}
                      alt={r.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 mb-1">{r.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-dark font-bold">
                        ₦{parseFloat(r.price_per_night).toLocaleString()}
                        <span className="text-slate-400 text-xs font-normal">/night</span>
                      </span>
                      <Link href={`/hotel/${r.slug}`} className="text-gold-dark text-sm font-semibold hover:text-primary">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
