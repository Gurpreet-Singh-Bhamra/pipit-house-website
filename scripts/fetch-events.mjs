import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data/events.json");
const markdownPath = path.join(root, "content/events.md");

const UPCOMING_MONTHS = 12;

/**
 * Lightweight mock of a Whitby events API.
 * Used when EVENTS_API_URL is unset or a live fetch fails.
 */
function mockWhitbyEventsApi() {
  return {
    source: "mock",
    events: [
      {
        slug: "whitby-goth-weekend-autumn-2026",
        title: "Whitby Goth Weekend",
        startDate: "2026-10-30",
        endDate: "2026-11-01",
        venue: "Whitby Pavilion, the Royal Hotel, and streets around the harbour",
        category: "festival",
        description:
          "Whitby’s twice-yearly gathering of gothic music, dark tailoring, and abbey-backdrop photographs. The town fills with weekend visitors; the old streets and the 199 steps become a catwalk after dark.",
        guestStops: [
          "Walk the swing bridge and the West Cliff for portraits — both are a few minutes from the cottage.",
          "Expect busier pubs and slower parking; leave the car and use the town on foot.",
          "The steep cottage stairs are awkward in long coats or platform boots — pack something you can climb in.",
          "Come back to the log burner on the ground floor when the sea fret rolls in.",
        ],
      },
      {
        slug: "bonfire-night-whitby-2026",
        title: "Bonfire Night in Whitby",
        startDate: "2026-11-05",
        endDate: "2026-11-05",
        venue: "West Cliff and harbour-side viewpoints",
        category: "seasonal",
        description:
          "The fifth of November on the North Yorkshire coast: fireworks over the Esk, a sharp walk, and a town still dressed from Goth Weekend. Displays can vary year to year, so check local listings the week you travel.",
        guestStops: [
          "The west pier and bandstand are about half a mile — wrap up and walk.",
          "The top-floor window looks over rooftops towards the marina if you would rather watch from the eaves.",
          "Dogs may find the bangs hard; keep them inside with the curtains drawn if they are noise-shy.",
        ],
      },
      {
        slug: "whitby-christmas-market-2026",
        title: "Whitby Christmas Market",
        startDate: "2026-11-13",
        endDate: "2026-11-15",
        venue: "Town centre stalls, organised with Whitby Town Council",
        category: "festival",
        description:
          "The official three-day Christmas market: chalets, food pitches, and the first proper crush of festive Whitby. Good for gifts, hot drinks, and an evening wander over the bridge.",
        guestStops: [
          "Shops and stalls are about a 0.4-mile walk from Pipit House — no need to move the car.",
          "A pub on the Esk is roughly 0.1 miles if you want to thaw out before the last climb home.",
          "The folding table downstairs is handy for a market supper of pies and cheese.",
        ],
      },
      {
        slug: "festive-whitby-december-2026",
        title: "Festive Whitby & winter market days",
        startDate: "2026-12-05",
        endDate: "2026-12-13",
        venue: "Old town streets, harbour, and seasonal stalls",
        category: "seasonal",
        description:
          "Lights on the stone lanes, winter stalls, and the odd Krampus-flavoured evening. December Whitby is colder, quieter midweek, and lively when the markets are on — check what is running the week you arrive.",
        guestStops: [
          "Walk the 199 steps up to St Mary’s for a clear winter view, then drop back to the cottage for the log burner.",
          "Fish and chips from the harbour side travel well up the lane if you time it before the queues.",
          "Linen and towels are already on the beds — you only need a warm coat and decent shoes for the hills.",
        ],
      },
      {
        slug: "whitby-boxing-day-dip-2026",
        title: "Whitby Boxing Day Dip",
        startDate: "2026-12-26",
        endDate: "2026-12-26",
        venue: "Whitby Bandstand, Pier Road",
        category: "tradition",
        description:
          "Fancy-dress plunge into the North Sea for local charities, usually around late morning at the bandstand. Spectators line the pier; dippers emerge grinning and very cold.",
        guestStops: [
          "The bandstand is an easy walk from the cottage — about half a mile to the west pier.",
          "Gas central heating and the log burner are waiting when you get back; towels are included in the let.",
          "If you are only watching, the twin-room window and the top floor both look towards town and sea.",
        ],
      },
      {
        slug: "new-year-on-the-esk-2026",
        title: "New Year on the Esk",
        startDate: "2026-12-31",
        endDate: "2027-01-01",
        venue: "Harbour, West Cliff, and the old streets",
        category: "seasonal",
        description:
          "Whitby sees the year out with harbour lights, a brisk walk, and whatever local countdown is billed that winter. Book early: New Year weeks fill the lanes around Pipit House.",
        guestStops: [
          "Walk down to the swing bridge for midnight, then climb home — the cottage is close enough to skip taxis.",
          "The eaves bedroom is a quiet place to wake on New Year’s Day with marina rooftops below.",
          "Two well-behaved dogs are welcome; keep them on the lead in the crowds and on the pier.",
        ],
      },
      {
        slug: "whitby-steampunk-weekend-feb-2027",
        title: "Whitby Steampunk Weekend",
        startDate: "2027-02-12",
        endDate: "2027-02-14",
        venue: "Venues and streets across Whitby",
        category: "festival",
        description:
          "Brass, goggles, and Victorian invention take over the town for a winter weekend. Confirm the year’s programme with the organisers before you travel — dates can be refined as the event nears.",
        guestStops: [
          "Costumes and the cottage’s two steep flights do not mix well — keep a simple pair of shoes by the door.",
          "Photograph the abbey and the whalebone arch, both a short walk, then retreat to the decked terrace if the sun is out.",
          "WiFi and Freeview are there if you want a quiet afternoon between parades.",
        ],
      },
      {
        slug: "whitby-steampunk-weekend-july-2027",
        title: "Whitby Steampunk Weekend (summer)",
        startDate: "2027-07-24",
        endDate: "2027-07-25",
        venue: "Venues and streets across Whitby",
        category: "festival",
        description:
          "The summer edition — same brass-and-goggles crowd, longer evenings, and a busier harbour. Pair it with a beach walk to Sandsend if the tide and weather play along.",
        guestStops: [
          "The rear deck is a good morning coffee stop before you join the streets.",
          "Beach and pier are about half a mile; take the washing machine for sandy towels.",
          "No private parking — use a car park or a tourist-board permit and walk in.",
        ],
      },
      {
        slug: "whitby-regatta-2027",
        title: "Whitby Regatta",
        startDate: "2027-08-14",
        endDate: "2027-08-16",
        venue: "River Esk, harbour, and the west pier",
        category: "regatta",
        description:
          "Three days of rowing, yacht racing, family entertainment, and a firework finale. The harbour is the stage; Pipit House sits close enough that you can hear the town gear up and see masts from the top floor.",
        guestStops: [
          "Watch the racing from the west pier or, on a clear day, from the eaves window over the marina.",
          "Fireworks are usually the Monday night closer — walk down, or stay on the terrace if the view opens up.",
          "Town is noisy and parking is worse than usual; travel light on foot from the cottage.",
        ],
      },
    ],
  };
}

async function fetchLiveGothDates() {
  try {
    const response = await fetch(
      "https://www.whitbygothweekend.co.uk/dates-line-up/",
      {
        headers: { "user-agent": "PipitHouseEventsBot/1.0 (local cottage site)" },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const hasAutumn2026 =
      /30(?:th)?\s+October/i.test(html) && /1(?:st)?\s+November 2026/i.test(html);

    return hasAutumn2026
      ? { confirmed: true, label: "Whitby Goth Weekend dates confirmed on organiser site" }
      : { confirmed: false, label: "Goth Weekend page fetched; check dates by eye" };
  } catch {
    return null;
  }
}

async function fetchEventFeed() {
  const customUrl = process.env.EVENTS_API_URL;

  if (customUrl) {
    const response = await fetch(customUrl, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`EVENTS_API_URL responded ${response.status}`);
    }

    const payload = await response.json();
    return { source: customUrl, events: payload.events ?? payload };
  }

  await new Promise((resolve) => setTimeout(resolve, 80));
  const mock = mockWhitbyEventsApi();
  const live = await fetchLiveGothDates();

  return {
    source: live ? `mock+${live.label}` : "mock",
    events: mock.events,
  };
}

function startOfToday() {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

function horizonDate() {
  const start = startOfToday();
  return new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + UPCOMING_MONTHS, start.getUTCDate()),
  );
}

function isUpcoming(event) {
  const end = new Date(`${event.endDate}T23:59:59Z`);
  const start = startOfToday();
  const until = horizonDate();
  return end >= start && new Date(`${event.startDate}T00:00:00Z`) <= until;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalise(event) {
  return {
    slug: event.slug || slugify(event.title),
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    venue: event.venue || "Whitby, North Yorkshire",
    category: event.category || "seasonal",
    description: event.description,
    guestStops: event.guestStops ?? [],
  };
}

function formatRange(startDate, endDate) {
  const start = new Date(`${startDate}T12:00:00Z`);
  const end = new Date(`${endDate}T12:00:00Z`);
  const sameDay = startDate === endDate;
  const options = { day: "numeric", month: "long", year: "numeric" };

  if (sameDay) {
    return start.toLocaleDateString("en-GB", options);
  }

  return `${start.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} – ${end.toLocaleDateString("en-GB", options)}`;
}

function toMarkdown(generatedAt, source, events) {
  const blocks = events.map((event) => {
    const stops = event.guestStops
      .map((stop) => `- ${stop}`)
      .join("\n");

    return `## ${event.title}

**${formatRange(event.startDate, event.endDate)}**  
${event.venue}

${event.description}

### Stops for guests staying at Pipit House

${stops}
`;
  });

  return `# Local events for Pipit House guests

Generated ${generatedAt} from ${source}.
Showing Whitby, North Yorkshire dates in the next ${UPCOMING_MONTHS} months.

${blocks.join("\n")}
`;
}

async function main() {
  const feed = await fetchEventFeed();
  const events = feed.events.map(normalise).filter(isUpcoming).sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );

  const generatedAt = new Date().toISOString();
  const catalog = {
    generatedAt,
    source: feed.source,
    location: "Whitby, North Yorkshire",
    events,
  };

  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.mkdir(path.dirname(markdownPath), { recursive: true });
  await fs.writeFile(dataPath, `${JSON.stringify(catalog, null, 2)}\n`);
  await fs.writeFile(markdownPath, toMarkdown(generatedAt, feed.source, events));

  console.log(`Wrote ${events.length} upcoming events to`);
  console.log(`  ${path.relative(root, dataPath)}`);
  console.log(`  ${path.relative(root, markdownPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
