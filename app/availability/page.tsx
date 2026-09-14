import type { Metadata } from "next";
import { BookingButton } from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Availability",
};

export default function AvailabilityPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Check availability
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        Dates, prices and booking for Pipit House are handled through Sykes
        Holiday Cottages. Open the listing to see what is free and reserve
        your stay.
      </p>
      <div className="mt-8">
        <BookingButton>Check availability</BookingButton>
      </div>
    </section>
  );
}
