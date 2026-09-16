import type { Metadata } from "next";
import { BookingButton } from "@/components/BookingButton";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { GALLERY_PHOTOS } from "@/lib/gallery";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos of Pipit House, a Whitby holiday cottage in North Yorkshire — harbour views from the eaves, the log burner, bedrooms, and the town a few minutes on foot.",
  path: "/gallery",
  ogTitle: "Gallery | Pipit House Whitby holiday cottage",
  keywords: [
    "Pipit House Whitby",
    "Whitby holiday let",
    "holiday cottage Whitby North Yorkshire",
  ],
});

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Life at Pipit House
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
        The marina from the eaves, the log burner downstairs, the green door at
        night, and Whitby a few minutes on foot. Click any photo to open it
        larger.
      </p>
      <div className="mt-10">
        <GalleryMasonry photos={GALLERY_PHOTOS} />
      </div>
      <div className="mt-12">
        <BookingButton>Check availability</BookingButton>
      </div>
    </section>
  );
}
