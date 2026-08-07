export const APPOINTMENT_BOOKING_HREF = "#book-appointment";

const APPOINTMENT_BOOKING_HREFS = new Set([
  APPOINTMENT_BOOKING_HREF,
  "/contact",
]);

export function isAppointmentBookingHref(href: string): boolean {
  return APPOINTMENT_BOOKING_HREFS.has(href);
}
