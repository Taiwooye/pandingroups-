import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#494B67] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#5A0E24] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V12h6v9M3 10h18" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">PaNDiN Group</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              The PaNDiN Group — business &amp; philanthropic endeavors of Paul, Nwando, Darius &amp; Nissi Olayiwola. You, but better!
            </p>
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#5A0E24] transition-colors"
                  aria-label={s}
                >
                  <span className="text-xs font-bold uppercase text-slate-400 hover:text-white">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h3>
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
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Guest Policies", href: "/policies" },
                { label: "Contact Us", href: "/contact" },
                { label: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-slate-400">Iyana Church, Off Iwo Road, Ibadan, Oyo State 200108, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2347054422968" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">+234 (0) 705 442 2968</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:pandinhotels@gmail.com" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">pandinhotels@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} PaNDiN Group. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Crafted with care for exceptional hospitality
          </p>
        </div>
      </div>
    </footer>
  );
}