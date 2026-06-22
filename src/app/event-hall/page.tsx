import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CardCarousel from "@/components/CardCarousel";
import * as venuesApi from "@/services/endpoints/venues";
import { ApiVenue } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Event Halls & Venues",
  description: "Host spectacular weddings, corporate events, and celebrations at PaNDiN Group's world-class event venues.",
};

const FALLBACK_IMAGE = "https://pandin-group-production.up.railway.app/storage/gallery/exterior-1.jpg";

export default async function EventHallPage() {
  let halls: ApiVenue[] = [];
  try {
    const result = await venuesApi.list();
    halls = result.data ?? [];
  } catch {
    halls = [];
  }

  const availableCount = halls.filter((h) => h.status.value === "available").length;

  return (
    <div>
      <PageHero
        title="Event Halls & Venues"
        subtitle="Create unforgettable memories in our stunning event spaces, from grand ballrooms to intimate garden pavilions."
        image={halls.find((h) => h.media[0]?.url)?.media[0]?.url ?? halls.find((h) => h.media[1]?.url)?.media[1]?.url ?? FALLBACK_IMAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Event Hall" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Available Venues</h2>
              <p className="text-slate-500 text-sm mt-1">{availableCount} of {halls.length} venues currently available</p>
            </div>
          </div>

          {halls.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="font-medium">No venues available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {halls.map((hall) => {
                const image = hall.media[0]?.url ?? FALLBACK_IMAGE;
                const isAvailable = hall.status.value === "available";
                const price = parseFloat(hall.price_per_day);

                const images = hall.media.length > 0 ? hall.media.map((m) => m.url) : [image];

                return (
                  <div key={hall.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
                    <div className="relative h-64 overflow-hidden">
                      <CardCarousel images={images} alt={hall.name} />
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {isAvailable ? "Available" : "Booked"}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{hall.name}</h3>
                      <p className="text-sm text-slate-500 mb-5 leading-relaxed">{hall.description}</p>

                      <div className="grid grid-cols-3 gap-3 mb-5">
                        <div className="bg-amber-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-amber-700">{hall.max_capacity}</div>
                          <div className="text-xs text-slate-500">Max Guests</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-amber-700">{hall.floor_space_sqm}m&sup2;</div>
                          <div className="text-xs text-slate-500">Floor Space</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-amber-700">&#8358;{(price / 1000).toFixed(0)}k</div>
                          <div className="text-xs text-slate-500">Per Day</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(hall.event_types ?? []).map((s) => (
                          <span key={s} className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">{s}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-bold text-amber-700">&#8358;{price.toLocaleString()}</span>
                          <span className="text-sm text-slate-400 ml-1">/ day</span>
                        </div>
                        <Link href={`/event-hall/${hall.slug}`} className="px-5 py-2 bg-[#5A0E24] text-white text-sm font-semibold rounded-lg hover:bg-[#921224] transition-colors">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Why Host Your Event With Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Event Planning Team", desc: "Our dedicated event planners handle every detail from concept to execution." },
              { icon: "🍽️", title: "In-house Catering", desc: "Award-winning chefs craft menus tailored to your event and preferences." },
              { icon: "🎤", title: "AV & Tech Support", desc: "State-of-the-art audio-visual equipment with full technical support." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
