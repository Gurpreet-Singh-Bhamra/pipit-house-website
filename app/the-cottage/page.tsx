import type { Metadata } from "next";
import { Amenities } from "@/components/Amenities";
import { BookingButton } from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "The Cottage",
};

export default function TheCottagePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Inside Pipit House
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        Three floors of a traditional Whitby fisherman’s cottage: a beamed
        living kitchen downstairs, a twin room and bathroom on the first
        floor, and a super-king (or twins) under the eaves with a view of the
        marina. Linen, towels, gas central heating and electricity are
        included. Please bring or buy your own logs for the burner.
      </p>
      <ul className="mt-8 max-w-2xl space-y-4 text-harbour-700">
        <li>
          <span className="font-medium text-harbour-900">Ground floor — </span>
          Sitting, dining and kitchen in one, with a log burner.
        </li>
        <li>
          <span className="font-medium text-harbour-900">First floor — </span>
          Twin bedroom and a bathroom with a freestanding bath plus a
          separate shower.
        </li>
        <li>
          <span className="font-medium text-harbour-900">Second floor — </span>
          Super-king zip/link (twin on request) looking over the estuary.
        </li>
      </ul>
      <div className="mt-8">
        <BookingButton />
      </div>
      <div className="mt-16">
        <Amenities />
      </div>
    </div>
  );
}
