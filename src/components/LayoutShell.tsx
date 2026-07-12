"use client";

import SiteNavbar from "@/components/SiteNavbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
