import Link from "next/link";
import { SYKES_BOOKING_URL } from "@/lib/booking";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/the-cottage", label: "The Cottage" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Local Events" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-harbour-100 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-harbour-900">
          Pipit House
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-harbour-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-harbour-900"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SYKES_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-harbour-900 transition-colors hover:text-harbour-700"
          >
            Check availability
          </a>
        </nav>
      </div>
    </header>
  );
}
