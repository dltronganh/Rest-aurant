"use client";

import Link from "next/link";
import { T } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

export function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <T id="brand" />
      </Link>
      <div className="topbar-controls">
        <nav className="nav" aria-label="Main navigation">
          <Link href="/drinks">
            <T id="navDrinks" />
          </Link>
          <Link href="/orders">
            <T id="navOrders" />
          </Link>
        </nav>
        <LanguageToggle />
      </div>
    </header>
  );
}
