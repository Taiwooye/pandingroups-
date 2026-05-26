import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure these in your .env.local file:
// EMAIL_USER=your-gmail@gmail.com
// EMAIL_PASSWORD=your-gmail-app-password  (16-char App Password from Google)
// OWNER_EMAIL=info@pandingroups.com

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, checkIn, checkOut, guests, specialRequests, bookingRef } = body;

    const serviceMap: Record<string, string> = {
      hotel: "Hotel Room",
      apartment: "Serviced Apartment",
      "event-hall": "Event Hall",
      "lounge-bar": "Lounge & Bar",
      dining: "Dining / Restaurant",
      other: "General Enquiry",
    };
    const serviceName = serviceMap[service] || service;

    // ─── Email to client ─────────────────────────────────────────────────────
    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Booking Receipt – PandinGroups</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#7B2D3A;padding:32px 36px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:0.5px;">PandinGroups</h1>
      <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Payment Receipt & Booking Confirmation</p>
    </div>
    <!-- Body -->
    <div style="padding:32px 36px;">
      <p style="color:#334155;font-size:15px;margin:0 0 20px;">Dear <strong>${name}</strong>,</p>
      <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Thank you for choosing PandinGroups. We have received your transfer notification and our team will verify your payment and send your official booking voucher shortly.
      </p>

      <!-- Reference box -->
      <div style="background:#f5e6e8;border:1.5px solid #7B2D3A;border-radius:10px;padding:16px 20px;margin-bottom:24px;text-align:center;">
        <p style="color:#7B2D3A;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px;">Booking Reference</p>
        <p style="color:#7B2D3A;font-size:26px;font-weight:bold;letter-spacing:3px;margin:0;">${bookingRef}</p>
      </div>

      <!-- Details table -->
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr style="background:#f8fafc;"><td style="padding:10px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;width:40%;">Service</td><td style="padding:10px 14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${serviceName}</td></tr>
        ${checkIn ? `<tr><td style="padding:10px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Check-in</td><td style="padding:10px 14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${checkIn}</td></tr>` : ""}
        ${checkOut ? `<tr style="background:#f8fafc;"><td style="padding:10px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Check-out</td><td style="padding:10px 14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${checkOut}</td></tr>` : ""}
        ${guests ? `<tr><td style="padding:10px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Guests</td><td style="padding:10px 14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${guests}</td></tr>` : ""}
        ${phone ? `<tr style="background:#f8fafc;"><td style="padding:10px 14px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Phone</td><td style="padding:10px 14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${phone}</td></tr>` : ""}
        ${specialRequests ? `<tr><td style="padding:10px 14px;color:#64748b;font-weight:600;">Special Requests</td><td style="padding:10px 14px;color:#1e293b;">${specialRequests}</td></tr>` : ""}
      </table>

      <!-- Payment info -->
      <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
        <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">
          <strong>Payment Verification:</strong> Your transfer is being verified. Once confirmed, you will receive your official booking voucher within 2 hours. For faster processing, WhatsApp your receipt to <strong>+234 (0) 123 456 7890</strong>.
        </p>
      </div>

      <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">
        Check-in: <strong>2:00 PM</strong> &nbsp;·&nbsp; Check-out: <strong>12:00 PM</strong><br>
        <strong>Address:</strong> Iyana Church, Off Iwo Road, Ibadan, Oyo State 200108
      </p>
    </div>
    <!-- Footer -->
    <div style="background:#f8fafc;padding:20px 36px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">PandinGroups Hotels · info@pandingroups.com · +234 (0) 123 456 7890</p>
    </div>
  </div>
</body>
</html>`;

    // ─── Email to owner ───────────────────────────────────────────────────────
    const ownerHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#7B2D3A;padding:24px 30px;">
      <h2 style="color:#fff;margin:0;font-size:18px;">New Transfer Notification – ${bookingRef}</h2>
    </div>
    <div style="padding:28px 30px;font-size:14px;color:#334155;">
      <p style="margin:0 0 16px;">A guest has confirmed their bank transfer. Please verify and process the booking.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f8fafc;"><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;width:38%;">Reference</td><td style="padding:9px 12px;color:#7B2D3A;font-weight:bold;border-bottom:1px solid #e2e8f0;">${bookingRef}</td></tr>
        <tr><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Guest Name</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${name}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Email</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${email}</td></tr>
        <tr><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Phone</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${phone || "—"}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Service</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${serviceName}</td></tr>
        ${checkIn ? `<tr><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Check-in</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${checkIn}</td></tr>` : ""}
        ${checkOut ? `<tr style="background:#f8fafc;"><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Check-out</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${checkOut}</td></tr>` : ""}
        ${guests ? `<tr><td style="padding:9px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Guests</td><td style="padding:9px 12px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${guests}</td></tr>` : ""}
        ${specialRequests ? `<tr style="background:#f8fafc;"><td style="padding:9px 12px;color:#64748b;font-weight:600;">Special Requests</td><td style="padding:9px 12px;color:#1e293b;">${specialRequests}</td></tr>` : ""}
      </table>
      <p style="margin:20px 0 0;font-size:13px;color:#64748b;">Action required: Verify the bank transfer and send the official booking voucher to the guest.</p>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"PandinGroups Bookings" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Booking Receipt – ${bookingRef} | PandinGroups`,
      html: clientHtml,
    });

    await transporter.sendMail({
      from: `"PandinGroups Bookings" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `[NEW TRANSFER] ${bookingRef} – ${name} · ${serviceName}`,
      html: ownerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
