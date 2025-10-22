import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[]
  subject: string
  html: string
  text: string
}) {
  try {
    const data = await resend.emails.send({
      from: ` Order <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject,
      html,
      text,
    })

    return { success: true, data }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error }
  }
}
