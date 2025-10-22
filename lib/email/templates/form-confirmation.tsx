import type { FormSubmission } from "@/lib/types"

export function generateFormConfirmationEmail(form: FormSubmission) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received - Honeystixx</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #fef5f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #e91e63 0%, #f8bbd0 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Honeystixx</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">Message Received</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #2d2d2d; font-size: 24px;">Thank you for contacting us!</h2>
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                Hi ${form.name},
              </p>
              <p style="margin: 0 0 30px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                We've received your message and our team will get back to you within 24 hours. Here's a copy of what you sent:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                      ${form.message.replace(/\n/g, "<br>")}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                If you have any urgent questions, feel free to reach out to us via WhatsApp.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}` : "#"}" style="display: inline-block; padding: 15px 40px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">Chat on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #fef5f8; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #6d6d6d; font-size: 14px;">
                Questions? Contact us at ${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"}
              </p>
              <p style="margin: 0; color: #6d6d6d; font-size: 12px;">
                © ${new Date().getFullYear()} Honeystixx. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
Message Received - Honeystixx

Thank you for contacting us, ${form.name}!

We've received your message and our team will get back to you within 24 hours.

Your Message:
${form.message}

If you have any urgent questions, feel free to reach out to us via WhatsApp.

Questions? Contact us at ${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"}

© ${new Date().getFullYear()} Honeystixx. All rights reserved.
  `

  return { html, text }
}
