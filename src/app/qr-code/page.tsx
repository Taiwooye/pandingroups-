"use client";

import QRCode from "react-qr-code";
import { useState } from "react";

const QR_TARGETS = [
  {
    label: "DarNis Lounge Menu (scan-to-view, this bar only)",
    path: "/lounge-bar/darnis-lounge",
    desc: "Live menu for DarNis Lounge tables",
  },
  {
    label: "Pool Side Bar Menu (scan-to-view, this bar only)",
    path: "/lounge-bar/pool-side-bar",
    desc: "Live menu for Pool Side Bar tables",
  },
  {
    label: "DarNis Lounge & Pool Bar Menu",
    path: "/lounge-menu",
    desc: "Full drink menu â€” print and place on lounge tables",
  },
  {
    label: "Book Now",
    path: "/book",
    desc: "Direct link to the booking/reservation page",
  },
  {
    label: "Main Website",
    path: "/",
    desc: "Homepage â€” general purpose QR code",
  },
];

export default function QRCodePage() {
  const [baseUrl, setBaseUrl] = useState("https://pandingroup.com");
  const [selected, setSelected] = useState(0);

  const fullUrl = `${baseUrl}${QR_TARGETS[selected].path}`;

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-serif font-semibold text-wine mb-1">QR Code Generator</h1>
        <p className="text-slate-500 text-sm mb-8">Generate and print QR codes for PaNDiN Group pages.</p>

        {/* Base URL */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Your domain</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="https://pandingroup.com"
          />
          <p className="text-xs text-slate-400 mt-1">Update this once your site is live on a custom domain.</p>
        </div>

        {/* Target selector */}
        <div className="mb-8 space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Page to link</label>
          {QR_TARGETS.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                selected === i
                  ? "border-[#5A0E24] bg-red-50 text-primary"
                  : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"
              }`}
            >
              <div className="font-semibold text-sm">{t.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>

        {/* QR Code display */}
        <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-8 text-center">
          <div className="inline-block p-4 bg-white rounded-xl border-2 border-cream-dark mb-5">
            <QRCode value={fullUrl} size={200} />
          </div>
          <p className="text-xs text-slate-400 font-mono break-all mb-4">{fullUrl}</p>
          <button
            onClick={() => window.print()}
            className="btn-wine px-6 py-2.5 text-sm font-semibold rounded-full"
          >
            Print QR Code
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          This page is for internal use. Share the QR code image with your print designer or print directly.
        </p>
      </div>

      <style>{`@media print { body { background: white; } button { display: none; } }`}</style>
    </div>
  );
}
