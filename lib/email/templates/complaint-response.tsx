import type { Complaint } from "@/lib/types"

export function generateComplaintResponseEmail(complaint: Complaint) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complaint Response - Honeystixx</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #fef5f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #e91e63 0%, #f8bbd0 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Honeystixx</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">Complaint Response</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #2d2d2d; font-size: 24px;">Response to Your Complaint</h2>
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                Hi ${complaint.customerName},
              </p>
              <p style="margin: 0 0 30px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                Thank you for bringing this matter to our attention. We've reviewed your complaint and here's our response:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px; color: #e91e63; font-size: 16px;">Your Complaint:</h3>
                    <p style="margin: 0 0 5px; color: #2d2d2d; font-size: 14px; font-weight: bold;">${complaint.subject}</p>
                    <p style="margin: 0; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                      ${complaint.description.replace(/\n/g, "<br>")}
                    </p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px; color: #4caf50; font-size: 16px;">Our Response:</h3>
                    <p style="margin: 0; color: #2d2d2d; font-size: 14px; line-height: 1.6;">
                      ${complaint.adminResponse?.replace(/\n/g, "<br>") || ""}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                If you have any further questions or concerns, please don't hesitate to reach out to us.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"}" style="display: inline-block; padding: 15px 40px; background-color: #e91e63; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">Reply to Us</a>
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
Complaint Response - Honeystixx

Hi ${complaint.customerName},

Thank you for bringing this matter to our attention. We've reviewed your complaint and here's our response:

Your Complaint:
${complaint.subject}
${complaint.description}

Our Response:
${complaint.adminResponse || ""}

If you have any further questions or concerns, please don't hesitate to reach out to us at ${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"}.

© ${new Date().getFullYear()} Honeystixx. All rights reserved.
  `

  return { html, text }
}
