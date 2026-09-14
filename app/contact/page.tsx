import type { Metadata } from "next";
import { BookingButton } from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        For dates and bookings, use the Sykes listing. If you already have a
        stay reserved and need to ask about arrival, dogs, or the zip/link
        bed, Sykes will pass the message on to us.
      </p>
      <div className="mt-8">
        <BookingButton>Check availability</BookingButton>
      </div>
    </section>
  );
}
