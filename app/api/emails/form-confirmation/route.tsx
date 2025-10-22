import { type NextRequest, NextResponse } from "next/server"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { sendEmail } from "@/lib/email/resend"
import { generateFormConfirmationEmail } from "@/lib/email/templates/form-confirmation"
import type { FormSubmission } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { formId } = await request.json()

    const docRef = doc(db, "forms", formId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 })
    }

    const form = { id: docSnap.id, ...docSnap.data() } as FormSubmission

    // Send confirmation email to customer
    const customerEmail = generateFormConfirmationEmail(form)
    await sendEmail({
      to: form.email,
      subject: "Message Received - Honeystixx",
      html: customerEmail.html,
      text: customerEmail.text,
    })

    // Send notification email to admin
    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}` ,
      subject: `New Form Submission from ${form.name}`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Phone:</strong> ${form.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${form.message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
New Form Submission

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Message:
${form.message}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
