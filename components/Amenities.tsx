const amenities = [
  { label: "Sleeps 4", detail: "Comfortable for two, room for four" },
  { label: "2 bedrooms", detail: "Super-king (zip/link) plus a twin" },
  { label: "1 bathroom", detail: "Freestanding bath and a separate shower" },
  { label: "WiFi", detail: "Broadband throughout the cottage" },
  { label: "Dog friendly", detail: "Two well-behaved dogs welcome" },
  { label: "Nearby parking", detail: "Street spaces, local car parks, or a tourist-board permit — no private space on site" },
  { label: "Log burner", detail: "Open-plan sitting room with a real fire — please bring or buy your own logs" },
  { label: "Washing machine", detail: "For sandy towels and wet-weather kit" },
  { label: "Kitchen", detail: "Electric oven, gas hob, microwave and fridge" },
  { label: "Freeview TV & DVD", detail: "Plus books, games and a film shelf" },
  { label: "Garden & terrace", detail: "Enclosed front bench, decked rear terrace with outdoor furniture" },
  { label: "Heating & power", detail: "Gas central heating and electricity are included. Logs for the burner are not provided" },
  { label: "Linen & towels", detail: "Beds made up, towels waiting" },
  { label: "No smoking", detail: "Please smoke outside only" },
];

export function Amenities() {
  return (
    <section aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="text-2xl font-semibold tracking-tight text-harbour-900">
        What you’ll find here
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((item) => (
          <li
            key={item.label}
            className="rounded-2xl border border-harbour-100 bg-white/70 p-5"
          >
            <p className="font-medium text-harbour-900">{item.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-harbour-700">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
