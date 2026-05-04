import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rest-aurant",
  description: "Minimal drink store management website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href="/">
              Rest-aurant
            </Link>
            <nav className="nav" aria-label="Main navigation">
              <Link href="/drinks">Drinks</Link>
              <Link href="/orders">Orders</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
