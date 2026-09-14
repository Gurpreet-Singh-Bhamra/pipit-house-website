import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { BookingButton } from "@/components/BookingButton";
import { getEventsCatalog, getLocalEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Local Events",
  description:
    "Upcoming festivals, the regatta, and seasonal Whitby weekends — with notes for guests staying at Pipit House.",
};

export default function BlogPage() {
  const catalog = getEventsCatalog();
  const events = getLocalEvents();
  const generated = new Date(catalog.generatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-harbour-500">
        Whitby, North Yorkshire
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-harbour-900 sm:text-4xl">
        Local events
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        Festivals, the regatta, and the odd icy dip — what is coming up in
        town, and how it sits with a stay at Pipit House. Dates move; always
        check the organiser before you travel.
      </p>
      <p className="mt-3 text-sm text-harbour-500">
        Last updated {generated}.
      </p>

      {events.length === 0 ? (
        <p className="mt-12 max-w-xl text-harbour-700">
          No upcoming listings in the current window. Run{" "}
          <code className="rounded bg-sand-100 px-1.5 py-0.5 text-sm">
            npm run events:fetch
          </code>{" "}
          to refresh the calendar.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}

      <div className="mt-14">
        <BookingButton>Check availability</BookingButton>
      </div>
    </section>
  );
}
