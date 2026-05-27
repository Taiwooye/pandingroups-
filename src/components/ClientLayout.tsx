"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BARE_ROUTES = ["/lounge-menu"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  return (
    <>
      {!isBare && <Navbar />}
      <main className={`flex-1 ${!isBare ? "" : ""}`}>{children}</main>
      {!isBare && <Footer />}
    </>
  );
}
