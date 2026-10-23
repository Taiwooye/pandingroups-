"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Hotel", href: "/hotel" },
  { label: "Apartments", href: "/apartments" },
  { label: "Event Hall", href: "/event-hall" },
  { label: "Lounge & Bar", href: "/lounge-bar" },
  { label: "Recreation", href: "/recreation" },
  { label: "Foundation", href: "/foundation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent over the home page hero until the visitor scrolls
  const overHero = pathname === "/" && !scrolled && !isOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        overHero
          ? "bg-transparent"
          : "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(61,8,24,0.25)] border-b border-gold/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-wine-gradient ring-1 ring-gold/50 flex items-center justify-center shadow-md group-hover:ring-gold transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-gold-light"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V12h6v9M3 10h18"
                />
              </svg>
            </div>
            <div className="leading-none">
              <span className={`font-serif text-xl font-semibold tracking-tight transition-colors ${overHero ? "text-white" : "text-primary"}`}>
                PaNDiN
              </span>
              <span className={`font-serif text-xl tracking-tight transition-colors ${overHero ? "text-gold-light" : "text-gold-dark"}`}>
                {" "}Group
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? overHero ? "text-gold-light" : "text-primary"
                    : overHero ? "text-white/85 hover:text-white" : "text-slate-600 hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gold origin-left transition-transform duration-300 ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="btn-gold hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold shadow-md"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${overHero ? "text-white hover:bg-white/10" : "text-slate-600 hover:text-primary hover:bg-cream"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gold/20 py-3 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-1 transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-cream border-l-2 border-gold"
                    : "text-slate-600 hover:text-primary hover:bg-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3 pb-1">
              <Link
                href="/book"
                className="btn-gold flex items-center justify-center w-full px-4 py-3 rounded-full text-sm font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
