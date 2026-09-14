import type { Metadata } from "next";
import { BookingButton } from "@/components/BookingButton";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { GALLERY_PHOTOS } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
};

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
