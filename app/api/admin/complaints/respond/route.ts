import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth/admin"
import { updateComplaint } from "@/lib/firebase/firestore"

export async function POST(request: NextRequest) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { complaintId, response } = await request.json()

    await updateComplaint(complaintId, {
      adminResponse: response,
      status: "resolved",
      resolvedAt: new Date(),
    })

    // Send email response (will be implemented in email automation task)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/complaint-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId }),
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to respond to complaint:", error)
    return NextResponse.json({ error: "Failed to respond to complaint" }, { status: 500 })
  }
}
