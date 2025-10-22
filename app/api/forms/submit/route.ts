import { type NextRequest, NextResponse } from "next/server"
import { createFormSubmission } from "@/lib/firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, formType } = body

    // Validate required fields
    if (!name || !email || !phone || !message || !formType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create form submission in Firestore
    const formId = await createFormSubmission({
      name,
      email,
      phone,
      message,
      formType,
    })

    // Send email notifications (will be implemented in email automation task)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/form-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId }),
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the form submission if email fails
    }

    return NextResponse.json({ success: true, formId })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit form" }, { status: 500 })
  }
}
