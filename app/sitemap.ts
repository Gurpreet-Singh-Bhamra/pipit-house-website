import type { MetadataRoute } from "next";
import { getEventsCatalog } from "@/lib/events";
import { SITE_URL } from "@/lib/site";

type SitemapRoute = {
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

const staticRoutes: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/the-cottage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/location", changeFrequency: "monthly", priority: 0.6 },
  { path: "/availability", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const eventsUpdatedAt = new Date(getEventsCatalog().generatedAt);
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.path === "/blog" ? eventsUpdatedAt : lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
