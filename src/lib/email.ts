import nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null | undefined;

function getTransporter(): nodemailer.Transporter | null {
  if (cachedTransporter !== undefined) return cachedTransporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;

  if (!user || !pass) {
    cachedTransporter = null;
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return cachedTransporter;
}

export type AppointmentNotificationInput = {
  name: string;
  phone: string;
  email: string;
  appointmentType: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  source?: string | null;
};

export async function sendAppointmentNotificationEmail(
  data: AppointmentNotificationInput,
): Promise<boolean> {
  const transporter = getTransporter();
  const to = process.env.APPOINTMENT_NOTIFICATION_EMAIL || process.env.SMTP_USER;

  if (!transporter || !to) {
    console.error(
      "[email] Skipped notification: SMTP_USER / SMTP_APP_PASSWORD / APPOINTMENT_NOTIFICATION_EMAIL not configured",
    );
    return false;
  }

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Appointment type", data.appointmentType],
    ["Preferred date", data.preferredDate ?? "Not specified"],
    ["Preferred time", data.preferredTime ?? "Not specified"],
    ["Source", data.source ?? "Website"],
  ];

  const textLines = rows.map(([label, value]) => `${label}: ${value}`);
  if (data.message) textLines.push("", "Message:", data.message);

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#475569;font-weight:600;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#0f172a;">${value}</td></tr>`,
    )
    .join("");

  try {
    await transporter.sendMail({
      from: `"RAC Nepal Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: data.email,
      subject: `New appointment request — ${data.name}`,
      text: textLines.join("\n"),
      html: `
        <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
          <h2 style="margin:0 0 12px;">New Appointment Request</h2>
          <table cellpadding="0" cellspacing="0">${htmlRows}</table>
          ${data.message ? `<p style="margin-top:16px;"><strong>Message:</strong><br />${data.message}</p>` : ""}
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("[email] Failed to send appointment notification", error);
    return false;
  }
}
