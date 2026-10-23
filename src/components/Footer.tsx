import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-wine-gradient text-white/70 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-wine-deep ring-1 ring-gold/50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold-light" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V12h6v9M3 10h18" />
                </svg>
              </div>
              <span className="font-serif text-xl font-semibold text-white tracking-tight">PaNDiN <span className="text-gold-light font-normal">Group</span></span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              The PaNDiN Group — business &amp; philanthropic endeavors of Paul, Nwando, Darius &amp; Nissi Olayiwola. You, but better!
            </p>
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="group w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"
                  aria-label={s}
                >
                  <span className="text-xs font-bold uppercase text-gold-light group-hover:text-wine-deep">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xs font-semibold text-gold-light uppercase tracking-[0.25em] mb-5">Our Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Hotel Rooms", href: "/hotel" },
                { label: "Apartments", href: "/apartments" },
                { label: "Event Hall", href: "/event-hall" },
                { label: "Lounge & Bar", href: "/lounge-bar" },
                { label: "Recreation & Wellness", href: "/recreation" },
                { label: "Mall & Cinema", href: "/mall" },
                { label: "PaNDiN Foundation", href: "/foundation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-gold-light hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-gold-light uppercase tracking-[0.25em] mb-5">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Guest Policies", href: "/policies" },
                { label: "Contact Us", href: "/contact" },
                { label: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-gold-light hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gold-light uppercase tracking-[0.25em] mb-5">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white/65">Iyana Church, Off Iwo Road, Ibadan, Oyo State 200108, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2347054422968" className="text-sm text-white/65 hover:text-gold-light transition-colors">+234 (0) 705 442 2968</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:pandinhotels@gmail.com" className="text-sm text-white/65 hover:text-gold-light transition-colors">pandinhotels@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/45">
            &copy; {new Date().getFullYear()} PaNDiN Group. All rights reserved.
          </p>
          <p className="text-sm text-white/45">
            Crafted with care for exceptional hospitality
          </p>
        </div>
      </div>
    </footer>
  );
}