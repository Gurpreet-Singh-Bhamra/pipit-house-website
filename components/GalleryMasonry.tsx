"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import type { CottagePhoto } from "@/lib/gallery";

function useGalleryColumns() {
  const [columnCount, setColumnCount] = useState(1);

  useLayoutEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setColumnCount(lg.matches ? 3 : sm.matches ? 2 : 1);
    };

    update();
    sm.addEventListener("change", update);
    lg.addEventListener("change", update);

    return () => {
      sm.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  return columnCount;
}

function splitIntoColumns<T>(items: T[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as T[]);

  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  return columns;
}

export function GalleryMasonry({ photos }: { photos: CottagePhoto[] }) {
  const [active, setActive] = useState<CottagePhoto | null>(null);
  const columnCount = useGalleryColumns();
  const columns = splitIntoColumns(photos, columnCount);

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
      <div className="flex gap-5">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex min-w-0 flex-1 flex-col gap-5"
          >
            {column.map((photo, photoIndex) => (
              <PhotoCard
                key={photo.slug}
                photo={photo}
                priority={photoIndex === 0}
                onOpen={() => setActive(photo)}
              />
            ))}
          </div>
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
            <figcaption className="mt-3 px-4 text-center text-sm text-sand-100">
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
  priority = false,
  onOpen,
}: {
  photo: CottagePhoto;
  priority?: boolean;
  onOpen: () => void;
}) {
  const landscape = photo.width >= photo.height;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full overflow-hidden rounded-2xl text-left shadow-sm ring-1 ring-harbour-100 transition hover:shadow-md"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-auto w-full object-cover"
      />
      <p
        className={`bg-white text-center text-sm leading-relaxed text-harbour-700 ${
          landscape ? "px-8 py-5 sm:px-10" : "px-6 py-4"
        }`}
      >
        {photo.caption}
      </p>
    </button>
  );
}
