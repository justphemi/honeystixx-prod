import { type NextRequest, NextResponse } from "next/server"
import { getOrder } from "@/lib/firebase/firestore"
import { sendEmail } from "@/lib/email/resend"

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Confirmed - Honeystixx</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fef5f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background-color: #4caf50; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Payment Confirmed!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #2d2d2d; font-size: 16px;">Hi ${order.customerName},</p>
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                Great news! Your payment for order <strong>${order.orderReference}</strong> has been confirmed. We're now processing your order and will ship it soon.
              </p>
              <p style="margin: 0; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                You'll receive a shipping notification once your order is on its way.
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
Payment Confirmed - Honeystixx

Hi ${order.customerName},

Great news! Your payment for order ${order.orderReference} has been confirmed. We're now processing your order and will ship it soon.

You'll receive a shipping notification once your order is on its way.
    `

    await sendEmail({
      to: order.customerEmail,
      subject: `Payment Confirmed - ${order.orderReference}`,
      html,
      text,
    })

    // Notify admin
    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}` ,
      subject: `Payment Confirmed: ${order.orderReference}`,
      html: `<p>Payment confirmed for order ${order.orderReference} - ₦${order.totalAmount.toFixed(2)}</p>`,
      text: `Payment confirmed for order ${order.orderReference} - ₦${order.totalAmount.toFixed(2)}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
