import { type NextRequest, NextResponse } from "next/server"
import { createComplaint } from "@/lib/firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderReference, customerName, customerEmail, customerPhone, complaintType, subject, description } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !complaintType || !subject || !description) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create complaint in Firestore
    const complaintId = await createComplaint({
      orderReference: orderReference || undefined,
      customerName,
      customerEmail,
      customerPhone,
      complaintType,
      subject,
      description,
    })

    // Send email notifications (will be implemented in email automation task)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/complaint-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId }),
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the complaint submission if email fails
    }

    return NextResponse.json({ success: true, complaintId })
  } catch (error) {
    console.error("Complaint submission error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit complaint" }, { status: 500 })
  }
}
