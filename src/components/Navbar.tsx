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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#C41230] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
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
              <span className="text-lg font-bold text-[#C41230] tracking-tight">
                PaNDiN
              </span>
              <span className="text-lg font-bold text-slate-700 tracking-tight">
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-amber-600 bg-amber-50"
                    : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[#C41230] text-white text-sm font-semibold hover:bg-[#921224] transition-colors shadow-sm"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
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
          <div className="lg:hidden border-t border-slate-100 py-3 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md mx-1 transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-amber-600 bg-amber-50"
                    : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3 pb-1">
              <Link
                href="/book"
                className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-[#C41230] text-white text-sm font-semibold hover:bg-[#921224] transition-colors"
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
