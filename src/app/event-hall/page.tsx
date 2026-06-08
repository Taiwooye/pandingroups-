import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import eventHallsData from "@/data/event-halls.json";
import { EventHall } from "@/types";

export const metadata: Metadata = {
  title: "Event Halls & Venues",
  description: "Host spectacular weddings, corporate events, and celebrations at PaNDiN Group's world-class event venues.",
};

const halls = eventHallsData as EventHall[];

export default function EventHallPage() {
  return (
    <div>
      <PageHero
        title="Event Halls & Venues"
        subtitle="Create unforgettable memories in our stunning event spaces, from grand ballrooms to intimate garden pavilions."
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Event Hall" }]}
        height="md"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Available Venues</h2>
              <p className="text-slate-500 text-sm mt-1">{halls.filter(h => h.available).length} of {halls.length} venues currently available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {halls.map((hall) => (
              <div key={hall.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <Image src={hall.image} alt={hall.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${hall.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {hall.available ? "Available" : "Booked"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{hall.name}</h3>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">{hall.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-amber-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-amber-700">{hall.capacity}</div>
                      <div className="text-xs text-slate-500">Max Guests</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-amber-700">{hall.size}m&sup2;</div>
                      <div className="text-xs text-slate-500">Floor Space</div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-amber-700">&#8358;{(hall.price / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-slate-500">Per Day</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {hall.suitable.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">{s}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-2xl font-bold text-amber-700">&#8358;{hall.price.toLocaleString()}</span>
                      <span className="text-sm text-slate-400 ml-1">/ day</span>
                    </div>
                    <Link href={`/event-hall/${hall.id}`} className="px-5 py-2 bg-[#5A0E24] text-white text-sm font-semibold rounded-lg hover:bg-[#921224] transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
