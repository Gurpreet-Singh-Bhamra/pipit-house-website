import type { Metadata } from "next";
import { HERO_PHOTO } from "@/lib/gallery";

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

export const OG_IMAGE = {
  url: `${SITE_URL}${HERO_PHOTO.src.replace(/\.webp$/, ".jpg")}`,
  width: HERO_PHOTO.width,
  height: HERO_PHOTO.height,
  alt: HERO_PHOTO.alt,
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
    keywords: [...new Set([...SITE_KEYWORDS, ...(keywords ?? [])])],
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
