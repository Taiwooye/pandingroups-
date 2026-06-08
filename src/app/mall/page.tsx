import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mall & Cinema | PaNDiN Group",
  description: "PaNDiN Mall & Cinema — coming soon. A world-class retail and entertainment destination in the heart of Ibadan.",
};

export default function MallPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#1a0510] to-slate-900 relative overflow-hidden mt-16 md:mt-20 px-4">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-white/8 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#5A0E24]/30 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "1s" }} />
        <div className="absolute w-[150px] h-[150px] rounded-full bg-[#5A0E24]/10 animate-pulse" />
      </div>

      {/* Floating dots decoration */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-amber-400/40 animate-bounce" style={{ animationDelay: "0s" }} />
      <div className="absolute top-32 right-16 w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0.3s" }} />
      <div className="absolute bottom-40 left-20 w-1 h-1 rounded-full bg-amber-300/50 animate-bounce" style={{ animationDelay: "0.6s" }} />
      <div className="absolute bottom-24 right-12 w-2 h-2 rounded-full bg-[#5A0E24]/60 animate-bounce" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: "1.2s" }} />

      {/* Main content */}
      <div className="relative text-center max-w-3xl mx-auto z-10">
        {/* Cinema reel icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-[#5A0E24]/40 border border-[#5A0E24]/60 flex items-center justify-center backdrop-blur-sm shadow-2xl">
            <span className="text-5xl">🎬</span>
          </div>
        </div>

        <span className="inline-block px-4 py-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full mb-5 border border-amber-400/30">
          Coming Soon
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          PaNDiN
          <span className="block text-amber-400">Mall & Cinema</span>
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-3 max-w-xl mx-auto">
          We are building something extraordinary. A world-class retail, dining, and entertainment destination — all under one roof in the heart of Ibadan.
        </p>
        <p className="text-slate-400 text-base mb-10 max-w-lg mx-auto">
          Shopping. Dining. Cinema. Leisure. Everything you love, elevated to a new standard.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["🛍️ Retail Shops", "🍽️ Food Court", "🎥 Multiplex Cinema", "🎮 Gaming Zone", "☕ Cafes & Lounges", "🅿️ Ample Parking"].map((f) => (
            <span key={f} className="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm rounded-full backdrop-blur-sm">
              {f}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-10 max-w-sm mx-auto">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Development Progress</span>
            <span>In Planning</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-r from-[#5A0E24] to-amber-500 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="px-8 py-3.5 bg-[#5A0E24] text-white font-semibold rounded-xl hover:bg-[#921224] transition-colors shadow-lg shadow-[#5A0E24]/30">
            Get Notified When We Open
          </Link>
          <Link href="/" className="px-8 py-3.5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors backdrop-blur-sm">
            Back to Home
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-8">
          For partnership and leasing enquiries, contact us at{" "}
          <a href="mailto:pandinhotels@gmail.com" className="text-amber-400 hover:text-amber-300">
            pandinhotels@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
