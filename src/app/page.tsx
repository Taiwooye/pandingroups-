import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import testimonials from "@/data/testimonials.json";
import rooms from "@/data/hotel-rooms.json";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "200+", label: "Luxury Rooms & Suites" },
  { value: "50K+", label: "Happy Guests" },
  { value: "12", label: "Industry Awards" },
];

const amenities = [
  { icon: "🏊", title: "Infinity Pool", desc: "Resort-style outdoor pool with city views" },
  { icon: "🏋️", title: "Fitness Center", desc: "State-of-the-art gym open 24 hours" },
  { icon: "💆", title: "Spa & Wellness", desc: "Full-service spa with steam room & sauna" },
  { icon: "🍽️", title: "Fine Dining", desc: "Three signature restaurants on-site" },
  { icon: "🛎️", title: "24/7 Concierge", desc: "Personal concierge at your service always" },
  { icon: "🚗", title: "Valet Parking", desc: "Complimentary valet for all guests" },
  { icon: "✈️", title: "Airport Transfer", desc: "Seamless private airport transfers" },
  { icon: "📶", title: "High-Speed WiFi", desc: "Complimentary gigabit WiFi throughout" },
];

export default function HomePage() {
  const featuredRooms = rooms.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
          alt="PandinGroups luxury hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#7B2D3A]/90 text-white text-sm font-semibold rounded-full mb-5 tracking-wide uppercase">
              Welcome to PandinGroups
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Where Luxury
              <span className="block text-sky-400">Meets Comfort</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Experience an unparalleled level of hospitality in our world-class hotel, serviced apartments, and exclusive event spaces in the heart of Lagos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/hotel"
                className="px-6 py-3 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors shadow-lg"
              >
                Explore Rooms
              </Link>
              <Link
                href="/book"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#7B2D3A] py-10">
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
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Everything You Need</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              From luxurious rooms to spectacular event spaces — PandinGroups has it all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Hotel Rooms"
              description="Luxurious rooms and suites with stunning views and premium amenities."
              image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"
              href="/hotel"
              badge="From ₦20,000/night"
            />
            <ServiceCard
              title="Apartments"
              description="Fully furnished serviced apartments for short and long-term stays."
              image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
              href="/apartments"
              badge="From ₦20,000/night"
            />
            <ServiceCard
              title="Event Hall"
              description="Spectacular venues for weddings, conferences, and unforgettable events."
              image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
              href="/event-hall"
              badge="Up to 500 guests"
            />
            <ServiceCard
              title="Lounge & Bar"
              description="Signature cocktails, fine whisky, and premium ambiance in our exclusive bars."
              image="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80"
              href="/lounge-bar"
              badge="Open Nightly"
            />
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Rooms & Suites</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Featured Accommodations</h2>
            </div>
            <Link href="/hotel" className="text-sky-600 font-semibold hover:text-sky-700 flex items-center gap-1.5 shrink-0">
              View All Rooms
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-[#7B2D3A]/90 text-white text-xs font-semibold rounded-full uppercase">{room.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{room.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-sky-700">₦{room.price.toLocaleString()}</span>
                      <span className="text-sm text-slate-400 ml-1">/ night</span>
                    </div>
                    <Link href={`/hotel/${room.id}`} className="px-4 py-2 bg-[#7B2D3A] text-white text-sm font-semibold rounded-lg hover:bg-[#5C1D28] transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">World-Class Facilities</span>
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Guest Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role} · {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80"
          alt="Book your stay"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#5C1D28]/80" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your stay at PandinGroups today and enjoy exclusive rates, complimentary breakfast, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-8 py-3.5 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors shadow-lg">
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
