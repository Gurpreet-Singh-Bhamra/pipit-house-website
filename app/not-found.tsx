import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-harbour-900">
        Page not found
      </h1>
      <p className="mt-4 text-harbour-700">
        That page does not exist. Head back to the cottage homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-harbour-900 px-6 py-3 text-sm font-medium text-sand-50"
      >
        Back home
      </Link>
    </section>
  );
}
