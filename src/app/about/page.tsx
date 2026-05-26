import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PandinGroups — our story, mission, values, and the passionate team behind your luxury experience.",
};

const team = [
  {
    name: "Chukwuemeka Pandin",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    bio: "Visionary hospitality leader with 20+ years crafting world-class guest experiences across Africa and Europe.",
  },
  {
    name: "Adaeze Nwosu",
    role: "General Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    bio: "Passionate about delivering flawless operations and personalized service to every guest at PandinGroups.",
  },
  {
    name: "James Okonkwo",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    bio: "Award-winning chef blending continental techniques with West African flavors to create truly unique menus.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Head of Events",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    bio: "Event maestro who has orchestrated over 500 spectacular weddings, galas, and corporate events.",
  },
];

const milestones = [
  { year: "2010", title: "Founded", desc: "PandinGroups opens its first hotel with 50 rooms in Lagos." },
  { year: "2013", title: "Expansion", desc: "Added serviced apartments and the first event hall." },
  { year: "2017", title: "Award", desc: "Voted Best Luxury Hotel in West Africa by TravelAward." },
  { year: "2020", title: "Renovation", desc: "Complete redesign of all facilities to a five-star standard." },
  { year: "2023", title: "Growth", desc: "Expanded to 200+ rooms, opened Azure Sky Bar and The Ocean Lounge." },
  { year: "2025", title: "Today", desc: "PandinGroups stands as Lagos' premier hospitality destination." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About PandinGroups"
        subtitle="15 years of exceptional hospitality, passion, and commitment to creating unforgettable experiences."
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        height="md"
      />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-6">Born from a Passion for Hospitality</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  PandinGroups was founded in 2010 with a simple but powerful vision: to create a hospitality experience that combines the warmth of African culture with the highest international standards of luxury and service.
                </p>
                <p>
                  What began as a boutique hotel in the heart of Lagos has grown into a complete hospitality destination — home to luxury hotel rooms, serviced apartments, stunning event venues, fine dining restaurants, and exclusive bars.
                </p>
                <p>
                  Today, with over 15 years of experience and 50,000+ satisfied guests from around the world, PandinGroups continues to set the benchmark for luxury hospitality in West Africa.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="px-6 py-3 bg-[#7B2D3A] text-white font-semibold rounded-xl hover:bg-[#5C1D28] transition-colors inline-block">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                alt="PandinGroups interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⭐", title: "Excellence", desc: "We set the highest standards in every aspect of our service, from room presentation to culinary arts." },
              { icon: "🤝", title: "Warmth", desc: "Every guest is treated like family. Genuine care and personal attention define every interaction." },
              { icon: "🌿", title: "Sustainability", desc: "We are committed to responsible hospitality — minimizing our environmental footprint and supporting local communities." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 shadow-sm text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, idx) => (
                <div key={m.year} className={`relative flex items-start gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-10`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#7B2D3A] ring-4 ring-rose-100 mt-1" />
                  <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                    <span className="text-[#7B2D3A] font-bold text-lg">{m.year}</span>
                    <h3 className="font-bold text-slate-800 mt-0.5">{m.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sky-600 text-sm font-semibold uppercase tracking-wider">The People Behind PandinGroups</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">Our Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm text-center group hover:shadow-md transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800">{member.name}</h3>
                  <p className="text-[#7B2D3A] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
