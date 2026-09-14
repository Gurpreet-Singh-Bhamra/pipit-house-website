import Image from "next/image";
import Link from "next/link";
import { BookingButton } from "@/components/BookingButton";
import { HERO_PHOTO } from "@/lib/gallery";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-harbour-900">
      <Image
        src={HERO_PHOTO.src}
        alt={HERO_PHOTO.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-harbour-900/85 via-harbour-900/35 to-harbour-900/20" />
      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sand-100">
          Whitby, North Yorkshire
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Pipit House — a fisherman’s cottage by the Esk.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100">
          Wake to masts and chimney pots. Four of you, two dogs, a log burner
          downstairs, and this view from the top floor.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <BookingButton variant="onDark" />
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full border border-sand-50/80 px-6 py-3 text-sm font-medium text-sand-50 transition-colors hover:bg-white/10"
          >
            See the cottage
          </Link>
        </div>
      </div>
    </section>
  );
}
