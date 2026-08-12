import { NextResponse } from "next/server";
import { after } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { sendAppointmentStatusEmail } from "@/lib/email";

const VALID_STATUSES = ["new", "contacted", "completed", "cancelled"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const previous = await prisma.appointmentRequest.findUnique({ where: { id } });
    const appointment = await prisma.appointmentRequest.update({
      where: { id },
      data: { status },
    });

    // Let the admin know the update succeeded right away; email the patient
    // in the background so a slow mail server doesn't hold up the admin UI.
    if (previous && previous.status !== status && status !== "new") {
      after(async () => {
        await sendAppointmentStatusEmail(appointment.email, appointment.name, status);
      });
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("[admin/appointments] Failed to update status", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.appointmentRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/appointments] Failed to delete", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}
