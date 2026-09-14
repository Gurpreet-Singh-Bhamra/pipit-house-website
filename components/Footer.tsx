import Link from "next/link";
import { SYKES_BOOKING_URL } from "@/lib/booking";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-harbour-100 bg-harbour-900 text-sand-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Pipit House</p>
          <p className="mt-1 text-sm text-sand-500">
            A fisherman’s cottage in Whitby, North Yorkshire.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={SYKES_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Check availability
          </a>
          <Link href="/blog" className="hover:text-white">
            Local Events
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
