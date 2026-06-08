import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "PaNDiN Foundation",
  description: "At PaNDiN Foundation, we are committed to making a difference through impactful community initiatives — education, healthcare, and empowerment.",
};

export default function FoundationPage() {
  return (
    <div>
      <PageHero
        title="PaNDiN Foundation"
        subtitle="Committed to making a difference through impactful community initiatives — empowering lives, one step at a time."
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Foundation" }]}
        height="md"
      />

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-6">Making a Difference</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            At the PaNDiN Foundation, we are committed to making a difference through impactful community initiatives. From educational programs, skill development, and healthcare support to social empowerment programs and philanthropic initiatives that foster growth, talent development, and upward mobility — we strive to create a better future for all.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Our Programs</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "That Next Step Africa Scholarship",
                desc: "Empowering young Africans with educational scholarships to pursue their dreams and achieve their God-given potential. We believe talent is universal — opportunity is not.",
                link: "https://thatnextstepafrica.com",
                linkLabel: "Visit thatnextstepafrica.com →",
              },
              {
                icon: "🍲",
                title: "Food is Life Program",
                desc: "Addressing food insecurity in our community by providing meals and nutritional support to those in need. Because everyone deserves to eat well.",
                link: null,
                linkLabel: null,
              },
              {
                icon: "❤️",
                title: "Charitable Programs",
                desc: "A wide range of community-driven charitable initiatives supporting healthcare, skill development, social empowerment, and upliftment for individuals and families in need.",
                link: null,
                linkLabel: null,
              },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-5">{p.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold text-sm hover:text-amber-700">
                    {p.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5A0E24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Involved</h2>
          <p className="text-white/80 text-lg mb-8">
            Whether you want to donate, volunteer, or learn more about our programs — we would love to hear from you. Together we can create a better future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://thatnextstepafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-white text-[#5A0E24] font-semibold rounded-xl hover:bg-amber-50 transition-colors"
            >
              That Next Step Africa
            </a>
            <Link href="/contact" className="px-7 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
