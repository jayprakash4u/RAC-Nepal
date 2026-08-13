import { NextResponse } from "next/server";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAppointmentNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, {
    key: "appointment-booking",
    max: 3,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later or call us directly.",
      },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  const { name, phone, email, appointmentType, preferredDate, preferredTime, message, source } = body;

  if (!name || !phone || !email || !appointmentType) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 },
    );
  }

  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof email !== "string" ||
    typeof appointmentType !== "string"
  ) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }

  const parsedDate =
    typeof preferredDate === "string" && preferredDate ? new Date(preferredDate) : null;

  const normalized = {
    name: name.trim().slice(0, 200),
    phone: phone.trim().slice(0, 50),
    email: email.trim().slice(0, 200),
    appointmentType: appointmentType.trim().slice(0, 50),
    preferredDate: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
    preferredTime:
      typeof preferredTime === "string" && preferredTime ? preferredTime.slice(0, 50) : null,
    message: typeof message === "string" && message ? message.slice(0, 2000) : null,
    source: typeof source === "string" && source ? source.slice(0, 100) : null,
  };

  const emailPayload = {
    ...normalized,
    preferredDate: normalized.preferredDate?.toISOString().split("T")[0] ?? null,
  };

  // The database is the source of truth. On the common path (DB write
  // succeeds) we respond immediately and send the notification email in the
  // background via after() — a slow or briefly-down mail server should never
  // delay the patient's confirmation. after() keeps the request alive until
  // the callback settles, so this is safe on serverless too.
  try {
    const appointment = await prisma.appointmentRequest.create({ data: normalized });

    after(async () => {
      const emailSent = await sendAppointmentNotificationEmail(emailPayload);
      if (emailSent) {
        await prisma.appointmentRequest
          .update({ where: { id: appointment.id }, data: { emailSent: true } })
          .catch((error) => console.error("[appointment-booking] Failed to flag emailSent", error));
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[appointment-booking] Database write failed, falling back to email-only", error);
  }

  // Fallback path: the database is unreachable. This should be rare, so it's
  // worth waiting here — a submission must not silently disappear, and we
  // need to know whether the fallback email got through before responding.
  const emailSent = await sendAppointmentNotificationEmail(emailPayload);

  if (!emailSent) {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
