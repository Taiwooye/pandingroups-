import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | PaNDiN Group",
  description: "Learn about The PaNDiN Group — the business and philanthropic endeavors of Paul, Nwando, Darius, and Nissi Olayiwola.",
};

const values = [
  { icon: "⭐", title: "Excellence", desc: "We set the highest standards in every aspect of our service — from room presentation to event hosting." },
  { icon: "🤝", title: "Community", desc: "Every guest, every neighbor, every partner matters. Genuine care and personal attention define every interaction." },
  { icon: "🌱", title: "Growth", desc: "We believe everyone should work hard to achieve their God-given potential. We create spaces and programs that help people be their best." },
];

const offerings = [
  { icon: "🏨", title: "Hotel", desc: "30-room hotel with Main Bar & Lounge, DarNis Private Lounge, and swimming pool." },
  { icon: "🏠", title: "Luxury Apartments", desc: "Fully serviced short-term stay apartments — 1BR, 2BR, 3BR & 4BR — with private pool." },
  { icon: "🎉", title: "Event Hall", desc: "Nwando's Event Hall accommodating 400–500 guests for any occasion." },
  { icon: "🍹", title: "Lounge & Bar", desc: "Indoor lounge with fine wines, premium liquors, and expertly crafted cocktails." },
  { icon: "🏊", title: "Recreation & Wellness", desc: "Swimming pool, basketball, billiards, table tennis, snooker, and gym facilities." },
  { icon: "🎬", title: "Mall & Cinema", desc: "PaNDiN Mall & Cinema — a world-class retail, dining, and entertainment destination. Coming soon." },
  { icon: "❤️", title: "PaNDiN Foundation", desc: "Charitable programs, Food is Life program, and That Next Step Africa Scholarship." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About PaNDiN Group"
        subtitle="A conglomerate of business and philanthropic endeavors of the Olayiwola family — you, but better!"
        image="https://pandin-group-production.up.railway.app/storage/gallery/exterior-4.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        height="md"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-6">Who We Are</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The PaNDiN Group is a conglomerate of business and philanthropic endeavors of <strong>Paul, Nwando, Darius, and Nissi (PaNDiN) Olayiwola</strong>. Our name is a tribute to the family behind it all.
                </p>
                <p>
                  We believe everyone should enjoy life, live to the fullest, and work hard to achieve their God-given potential. That vision shapes everything we do — from our world-class hotel and luxury apartments to our community programs and wellness facilities.
                </p>
                <p>
                  Experience our full-service hotel, short-term stay luxury apartments, lounge, event space, and fitness and swimming facilities. Be part of our community and charitable services, or participate in our sports and wellness activities.
                </p>
                <p className="text-[#5A0E24] font-semibold text-lg">Be the best version of yourself with PaNDiN — you, but better!</p>
              </div>
              <div className="mt-8 flex gap-3 flex-wrap">
                <Link href="/contact" className="px-6 py-3 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors inline-block">
                  Get in Touch
                </Link>
                <Link href="/book" className="px-6 py-3 bg-amber-50 text-amber-700 font-semibold rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors inline-block">
                  Book Your Stay
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://pandin-group-production.up.railway.app/storage/gallery/hotel-2.jpg" alt="PaNDiN Group hotel interior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Everything Under One Roof</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">What PaNDiN Group Offers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o) => (
              <div key={o.title} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="text-4xl mb-4">{o.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{o.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-slate-50 rounded-2xl p-7 shadow-sm text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#5A0E24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-300 text-sm font-semibold uppercase tracking-wider">Limited Time Offers</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-8">Special Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🍽️", title: "Dine Free", desc: "Book 2 nights hotel or apartment and get 2 free dinner or breakfast meals" },
              { icon: "🏋️", title: "Gym Bonus", desc: "Book 5 to 7 days apartment and get 1 free week of gym use when it opens" },
              { icon: "💸", title: "10% Off", desc: "10% off any stay or event booked online — contact us for current active deals" },
            ].map((p) => (
              <div key={p.title} className="bg-white/10 rounded-2xl p-6 text-white text-center border border-white/20">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/book" className="inline-block px-7 py-3 bg-white text-[#5A0E24] font-semibold rounded-xl hover:bg-amber-50 transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
