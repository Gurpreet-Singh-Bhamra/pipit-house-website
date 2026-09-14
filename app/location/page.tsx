import type { Metadata } from "next";
import { BookingButton } from "@/components/BookingButton";

export const metadata: Metadata = {
  title: "Location",
};

export default function LocationPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Finding Pipit House
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        You are in Whitby town, on a quieter lane a short walk from the River
        Esk and the swing bridge — handy for the old streets, the whalebone
        arch, and the climb up to St Mary’s and the abbey. The beach is about
        half a mile; shops around 0.4 miles; a pub and the river about 0.1
        miles.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        There is no parking at the cottage itself. Plan for roadside spaces
        nearby, a public car park, or a permit from the tourist board bought
        before you travel. The front garden is enclosed with a bench; the
        rear garden is terraced with decking. Please keep dogs and children
        in sight in both.
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        Robin Hood’s Bay is about 5.5 miles along the coast; Scarborough
        roughly 19 miles. Check-in is from 3:30pm, check-out by 10am.
      </p>
      <div className="mt-8">
        <BookingButton />
      </div>
    </section>
  );
}
