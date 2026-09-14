"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CottagePhoto } from "@/lib/gallery";

export function GalleryMasonry({ photos }: { photos: CottagePhoto[] }) {
  const [active, setActive] = useState<CottagePhoto | null>(null);
  const [featured, ...rest] = photos;

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <>
      {featured ? (
        <PhotoCard
          photo={featured}
          featured
          onOpen={() => setActive(featured)}
        />
      ) : null}

      <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((photo) => (
          <PhotoCard
            key={photo.slug}
            photo={photo}
            onOpen={() => setActive(photo)}
          />
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-harbour-900/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <figure
            className="relative max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-sand-100">
              {active.caption}
            </figcaption>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-3 right-0 rounded-full bg-white px-3 py-1 text-sm font-medium text-harbour-900"
            >
              Close
            </button>
          </figure>
        </div>
      ) : null}
    </>
  );
}

function PhotoCard({
  photo,
  featured = false,
  onOpen,
}: {
  photo: CottagePhoto;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`block w-full overflow-hidden rounded-2xl text-left shadow-sm ring-1 ring-harbour-100 transition hover:shadow-md ${
        featured ? "" : ""
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={featured}
        sizes={
          featured
            ? "100vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className={`w-full object-cover ${featured ? "max-h-[70vh]" : "h-auto"}`}
      />
      <p className="bg-white px-4 py-3 text-sm leading-relaxed text-harbour-700">
        {photo.caption}
      </p>
    </button>
  );
}
