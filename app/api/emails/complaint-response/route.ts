import { type NextRequest, NextResponse } from "next/server"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { sendEmail } from "@/lib/email/resend"
import { generateComplaintResponseEmail } from "@/lib/email/templates/complaint-response"
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

    // Send response email to customer
    const responseEmail = generateComplaintResponseEmail(complaint)
    await sendEmail({
      to: complaint.customerEmail,
      subject: `Response to Your Complaint - ${complaint.subject}`,
      html: responseEmail.html,
      text: responseEmail.text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
