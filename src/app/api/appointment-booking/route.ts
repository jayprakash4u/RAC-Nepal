import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAppointmentNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 },
      );
    }

    const parsedDate =
      typeof preferredDate === "string" && preferredDate ? new Date(preferredDate) : null;

    const appointment = await prisma.appointmentRequest.create({
      data: {
        name: name.trim().slice(0, 200),
        phone: phone.trim().slice(0, 50),
        email: email.trim().slice(0, 200),
        appointmentType: appointmentType.trim().slice(0, 50),
        preferredDate: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
        preferredTime:
          typeof preferredTime === "string" && preferredTime ? preferredTime.slice(0, 50) : null,
        message: typeof message === "string" && message ? message.slice(0, 2000) : null,
        source: typeof source === "string" && source ? source.slice(0, 100) : null,
      },
    });

    const emailSent = await sendAppointmentNotificationEmail({
      name: appointment.name,
      phone: appointment.phone,
      email: appointment.email,
      appointmentType: appointment.appointmentType,
      preferredDate: appointment.preferredDate?.toISOString().split("T")[0] ?? null,
      preferredTime: appointment.preferredTime,
      message: appointment.message,
      source: appointment.source,
    });

    if (emailSent) {
      await prisma.appointmentRequest.update({
        where: { id: appointment.id },
        data: { emailSent: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[appointment-booking] Failed to save request", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please call us instead." },
      { status: 500 },
    );
  }
}
