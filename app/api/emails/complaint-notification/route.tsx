import { type NextRequest, NextResponse } from "next/server"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { sendEmail } from "@/lib/email/resend"
import type { Complaint } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { complaintId } = await request.json()

    const docRef = doc(db, "complaints", complaintId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    const complaint = { id: docSnap.id, ...docSnap.data() } as Complaint

    // Send notification email to admin
    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}` ,
      subject: `New Complaint: ${complaint.subject}`,
      html: `
        <h2>New Complaint Received</h2>
        <p><strong>Customer:</strong> ${complaint.customerName}</p>
        <p><strong>Email:</strong> ${complaint.customerEmail}</p>
        <p><strong>Phone:</strong> ${complaint.customerPhone}</p>
        ${complaint.orderReference ? `<p><strong>Order Reference:</strong> ${complaint.orderReference}</p>` : ""}
        <p><strong>Type:</strong> ${complaint.complaintType}</p>
        <p><strong>Subject:</strong> ${complaint.subject}</p>
        <p><strong>Description:</strong></p>
        <p>${complaint.description.replace(/\n/g, "<br>")}</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard">View in Admin Dashboard</a></p>
      `,
      text: `
New Complaint Received

Customer: ${complaint.customerName}
Email: ${complaint.customerEmail}
Phone: ${complaint.customerPhone}
${complaint.orderReference ? `Order Reference: ${complaint.orderReference}` : ""}
Type: ${complaint.complaintType}
Subject: ${complaint.subject}

Description:
${complaint.description}

View in Admin Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard
      `,
    })

    // Send acknowledgment email to customer
    await sendEmail({
      to: complaint.customerEmail,
      subject: "Complaint Received - Honeystixx",
      html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Complaint Received</h2>
  <p>Hi ${complaint.customerName},</p>
  <p>We've received your complaint and our team is reviewing it. We'll get back to you within 24-48 hours.</p>
  <p>Thank you for your patience.</p>
  <p>Best regards,<br>Honeystixx Team</p>
</body>
</html>
      `,
      text: `
Complaint Received - Honeystixx

Hi ${complaint.customerName},

We've received your complaint and our team is reviewing it. We'll get back to you within 24-48 hours.

Thank you for your patience.

Best regards,
Honeystixx Team
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
