import { Amenities } from "@/components/Amenities";
import { BookingButton } from "@/components/BookingButton";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-harbour-700">
          <div>
            <dt className="font-medium text-harbour-900">Guests</dt>
            <dd>Sleeps 4</dd>
          </div>
          <div>
            <dt className="font-medium text-harbour-900">Rooms</dt>
            <dd>2 bedrooms, 1 bathroom</dd>
          </div>
          <div>
            <dt className="font-medium text-harbour-900">Dogs</dt>
            <dd>2 well-behaved dogs welcome</dd>
          </div>
          <div>
            <dt className="font-medium text-harbour-900">WiFi</dt>
            <dd>Broadband included</dd>
          </div>
        </dl>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-harbour-700">
          Our three-storey cottage sits on a quiet lane a few minutes from the
          swing bridge, away from the amusement arcades but close enough that
          you can walk for fish and chips, the 199 steps, or a paddle on the
          beach.
        </p>
      </section>

      <section className="border-y border-harbour-100 bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-harbour-900">
              How the house is laid out
            </h2>
            <p className="mt-4 leading-relaxed text-harbour-700">
              Pipit House is an old Whitby fisherman’s cottage, so the stairs
              are steep and the rooms feel lived-in rather than cavernous. Gas
              central heating and original beams keep the ground floor snug
              after a walk along the harbour wall.
            </p>
            <p className="mt-4 leading-relaxed text-harbour-700">
              Two flights of stairs mean it is not a good fit for guests with
              limited mobility, or for very small children who still need a
              hand on every step. Dogs and children should be supervised in the
              house and gardens.
            </p>
          </div>
          <ol className="space-y-6 text-harbour-700">
            <li>
              <p className="font-medium text-harbour-900">Ground floor</p>
              <p className="mt-1 leading-relaxed">
                Open-plan kitchen, dining and sitting room with a log burner.
                The kitchen has an electric oven, gas hob, microwave,
                fridge and washing machine. A folding table and four chairs
                come out when you want a proper meal together.
              </p>
            </li>
            <li>
              <p className="font-medium text-harbour-900">First floor</p>
              <p className="mt-1 leading-relaxed">
                Twin bedroom, plus the bathroom: a freestanding bath, a
                separate shower cubicle, basin and WC.
              </p>
            </li>
            <li>
              <p className="font-medium text-harbour-900">Second floor</p>
              <p className="mt-1 leading-relaxed">
                Super-king bed that can be made as twins if you ask ahead.
                From here you look over rooftops to the marina and the mouth
                of the Esk — gulls, masts, and the abbey on the far headland.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <Amenities />
      </div>

      <section className="border-t border-harbour-100 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-harbour-900">
            Where you will be
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
            The river and a pub are about a tenth of a mile away; shops around
            0.4 miles; the beach about half a mile. Whitby Abbey is a quiet
            ten-minute walk. There is an enclosed front garden with a bench,
            and a terraced, decked garden at the back — handy after a day on
            the Cinder Track or a wander over to Sandsend.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-harbour-700">
            We do not have a private parking space. Most guests use nearby
            roadside parking (first come, first served), local car parks, or a
            permit bought in advance from the tourist board. Arrive from
            3:30pm; we ask you to leave by 10am.
          </p>
          <div className="mt-8">
            <BookingButton>Check availability</BookingButton>
          </div>
        </div>
      </section>
    </div>
  );
}
