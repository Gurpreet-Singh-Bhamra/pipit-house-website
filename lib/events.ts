import catalog from "@/data/events.json";

export type EventCategory = "festival" | "regatta" | "seasonal" | "tradition";

export type LocalEvent = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  category: EventCategory | string;
  description: string;
  guestStops: string[];
};

export type EventsCatalog = {
  generatedAt: string;
  source: string;
  location: string;
  events: LocalEvent[];
};

export function getEventsCatalog(): EventsCatalog {
  return catalog as EventsCatalog;
}

export function getLocalEvents(): LocalEvent[] {
  return [...getEventsCatalog().events].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
}

export function formatEventDates(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T12:00:00Z`);
  const end = new Date(`${endDate}T12:00:00Z`);
  const dateStyle: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  if (startDate === endDate) {
    return start.toLocaleDateString("en-GB", dateStyle);
  }

  return `${start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })} – ${end.toLocaleDateString("en-GB", dateStyle)}`;
}
