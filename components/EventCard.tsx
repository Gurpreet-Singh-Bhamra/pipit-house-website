import { formatEventDates, type LocalEvent } from "@/lib/events";

const categoryStyles: Record<string, string> = {
  festival: "bg-harbour-100 text-harbour-900",
  regatta: "bg-harbour-900 text-sand-50",
  seasonal: "bg-sand-100 text-harbour-800",
  tradition: "bg-harbour-700 text-sand-50",
};

export function EventCard({ event }: { event: LocalEvent }) {
  const badge = categoryStyles[event.category] ?? categoryStyles.seasonal;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-harbour-100">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${badge}`}
          >
            {event.category}
          </span>
          <time
            dateTime={event.startDate}
            className="text-sm font-medium text-harbour-700"
          >
            {formatEventDates(event.startDate, event.endDate)}
          </time>
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-harbour-900">
          {event.title}
        </h2>
        <p className="mt-1 text-sm text-harbour-500">{event.venue}</p>
        <p className="mt-4 flex-1 leading-relaxed text-harbour-700">
          {event.description}
        </p>
        {event.guestStops.length > 0 ? (
          <div className="mt-6 rounded-xl bg-sand-100 p-4">
            <h3 className="text-sm font-semibold text-harbour-900">
              Stops for guests staying at Pipit House
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-harbour-700">
              {event.guestStops.map((stop) => (
                <li key={stop} className="pl-1">
                  {stop}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
