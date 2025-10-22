import { type NextRequest, NextResponse } from "next/server"
import { getOrder } from "@/lib/firebase/firestore"
import { sendEmail } from "@/lib/email/resend"
import { generateOrderConfirmationEmail } from "@/lib/email/templates/order-confirmation"
import { generateAdminOrderNotificationEmail } from "@/lib/email/templates/admin-order-notification"

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Send confirmation email to customer
    const customerEmail = generateOrderConfirmationEmail(order)
    await sendEmail({
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderReference}`,
      html: customerEmail.html,
      text: customerEmail.text,
    })

    // Send notification email to admin
    const adminEmail = generateAdminOrderNotificationEmail(order)
    await sendEmail({
      to: `${process.env.ADMIN_EMAIL}`,
      subject: `New Order: ${order.orderReference}`,
      html: adminEmail.html,
      text: adminEmail.text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
