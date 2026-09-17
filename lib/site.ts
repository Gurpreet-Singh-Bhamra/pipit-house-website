import type { Metadata } from "next";
import { GALLERY_PHOTOS, HERO_PHOTO } from "@/lib/gallery";

export const SITE_URL = "https://pipithousewhitby.co.uk";
export const SITE_NAME = "Pipit House Whitby";

export const HOME_TITLE =
  "Pipit House | Whitby holiday let & fisherman’s cottage";

export const HOME_DESCRIPTION =
  "Book Pipit House, a traditional fisherman’s cottage and Whitby holiday let in North Yorkshire. Harbour views, dog-friendly accommodation for two well-behaved dogs, a log burner, and a super-king eaves room — sleeps 4.";

export const SITE_KEYWORDS = [
  "Whitby holiday let",
  "holiday cottage Whitby North Yorkshire",
  "traditional fisherman cottage Whitby harbor",
  "traditional fisherman’s cottage Whitby harbour",
  "dog-friendly accommodation Whitby",
  "Pipit House Whitby booking",
  "Pipit House Whitby",
  "dog friendly holiday cottage Whitby",
  "Whitby harbour holiday cottage",
];

function jpegUrl(src: string): string {
  return `${SITE_URL}${src.replace(/\.webp$/, ".jpg")}`;
}

export const OG_IMAGE = {
  url: jpegUrl(HERO_PHOTO.src),
  width: HERO_PHOTO.width,
  height: HERO_PHOTO.height,
  alt: HERO_PHOTO.alt,
};

const VACATION_RENTAL_IMAGE_SLUGS = [
  HERO_PHOTO.slug,
  "cottage-facade",
  "living-room-stove",
  "top-bedroom",
  "twin-bedroom",
  "bathroom",
  "rear-deck",
  "cottage-stairs",
] as const;

const photosBySlug = new Map(
  GALLERY_PHOTOS.map((photo) => [photo.slug, photo]),
);

export const VACATION_RENTAL_IMAGES = VACATION_RENTAL_IMAGE_SLUGS.map(
  (slug) => jpegUrl(photosBySlug.get(slug)?.src ?? HERO_PHOTO.src),
);

export const VACATION_RENTAL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  additionalType: "Cottage",
  identifier: "pipit-house-whitby",
  name: "Pipit House",
  url: SITE_URL,
  description:
    "A holiday cottage in Whitby close to the harbor and town center",
  petsAllowed: true,
  image: VACATION_RENTAL_IMAGES,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Whitby",
    addressRegion: "North Yorkshire",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 54.481897,
    longitude: -0.609367,
  },
  containsPlace: {
    "@type": "Accommodation",
    additionalType: "EntirePlace",
    occupancy: {
      "@type": "QuantitativeValue",
      value: 4,
    },
    numberOfBedrooms: 2,
    numberOfBathroomsTotal: 1,
    bed: [
      {
        "@type": "BedDetails",
        numberOfBeds: 1,
        typeOfBed: "King",
      },
      {
        "@type": "BedDetails",
        numberOfBeds: 2,
        typeOfBed: "Single",
      },
    ],
  },
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogTitle,
}: PageSeo): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = ogTitle ?? title;

  return {
    title,
    description,
    keywords: Array.from(new Set([...SITE_KEYWORDS, ...(keywords ?? [])])),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}