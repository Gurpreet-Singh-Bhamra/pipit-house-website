import { SYKES_BOOKING_URL } from "@/lib/booking";

type BookingButtonProps = {
  variant?: "primary" | "secondary" | "onDark" | "onDarkOutline";
  children?: React.ReactNode;
};

const variants = {
  primary: "bg-harbour-900 text-sand-50 hover:bg-harbour-700",
  secondary:
    "border border-harbour-200 bg-transparent text-harbour-900 hover:bg-sand-100",
  onDark: "bg-sand-50 text-harbour-900 hover:bg-white",
  onDarkOutline:
    "border border-sand-50/80 bg-transparent text-sand-50 hover:bg-white/10",
};

export function BookingButton({
  variant = "primary",
  children = "Check availability",
}: BookingButtonProps) {
  return (
    <a
      href={SYKES_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
