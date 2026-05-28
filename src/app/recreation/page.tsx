import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Recreation & Wellness",
  description: "Experience the perfect balance of fitness and relaxation at PaNDiN Recreation & Wellness — swimming, basketball, billiards, table tennis, snooker, and gym facilities.",
};

const activities = [
  {
    icon: "🏊",
    title: "Swimming Pool",
    desc: "Enjoy our beautiful swimming pool — available for recreational swimming, lessons, and pool parties. Equipment, floaties, and clean towels provided.",
    highlights: ["Swimming lessons available", "Pool party packages", "Towel & swimwear rental", "Lifeguard on duty"],
  },
  {
    icon: "🏀",
    title: "Basketball",
    desc: "Take your game to the next level with our basketball clinics and camps. Suitable for beginners to advanced players, coached by experienced professionals.",
    highlights: ["Clinics & camps", "All skill levels welcome", "Youth programs available", "Team tournaments"],
  },
  {
    icon: "🎱",
    title: "Billiards & Snooker",
    desc: "Challenge yourself or compete with friends in our billiards and snooker area. Lessons and tournaments available for all skill levels.",
    highlights: ["Snooker tables", "Pool/billiard tables", "Beginner lessons", "Tournaments & competitions"],
  },
  {
    icon: "🏓",
    title: "Table Tennis",
    desc: "Fast, fun, and competitive — our table tennis facility is perfect for casual play or structured training. Lessons and tournaments held regularly.",
    highlights: ["Professional tables", "Coaching available", "Regular tournaments", "Equipment provided"],
  },
  {
    icon: "🏋️",
    title: "Gym Facilities",
    desc: "Our gym is coming soon — packed with modern equipment for cardio, strength training, and functional fitness. Stay tuned for the grand opening!",
    highlights: ["Modern equipment", "Cardio & strength training", "Professional trainers", "Coming Soon"],
  },
];

export default function RecreationPage() {
  return (
    <div>
      <PageHero
        title="Recreation & Wellness"
        subtitle="Experience the perfect balance of fitness and relaxation. From the pool to the court — we offer something for everyone."
        image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Recreation" }]}
        height="md"
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Active Living</span>
          <h2 className="text-3xl font-bold text-slate-800 mt-2 mb-4">Stay Active. Stay Well.</h2>
          <p className="text-slate-600 leading-relaxed">
            Whether you are looking to stay active, unwind, or enjoy friendly competition, our Recreation & Wellness facilities provide the ideal setting for both leisure and performance. From invigorating workouts to engaging sports and refreshing poolside moments — we offer something for everyone seeking a well-rounded lifestyle.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="text-5xl mb-4">{a.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{a.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{a.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {a.highlights.map((h) => (
                    <span key={h} className={`px-3 py-1 text-xs rounded-full font-medium ${h === "Coming Soon" ? "bg-amber-100 text-amber-700" : "bg-amber-50 text-amber-700"}`}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section className="py-16 bg-[#5A0E24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8">
            Sign up for swimming lessons, book a court, or enquire about our sports programs. Our team is ready to help you get active.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-7 py-3 bg-white text-[#5A0E24] font-semibold rounded-xl hover:bg-amber-50 transition-colors">
              Sign Up / Enquire
            </Link>
            <a href="tel:+2347054422968" className="px-7 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Call +234 705 442 2968
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
