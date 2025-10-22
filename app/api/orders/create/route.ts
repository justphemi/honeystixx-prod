import { type NextRequest, NextResponse } from "next/server"
import { createOrder, getOrder } from "@/lib/firebase/firestore"
import { generateOrderReference } from "@/lib/utils/generate-reference"
import { generateOrderConfirmationEmail } from "@/lib/email/templates/order-confirmation"
import { generateAdminOrderNotificationEmail } from "@/lib/email/templates/admin-order-notification"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      paystackReference,
    } = body

    // Validate required fields
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress ||
      !items ||
      !totalAmount ||
      !paystackReference
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate order reference
    const orderReference = generateOrderReference()

    // Create order in Firestore
    const orderId = await createOrder({
      orderReference,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
      paystackReference,
    })

    // Fetch the created order to include details in the email
    const order = await getOrder(orderId)
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found after creation" },
        { status: 404 }
      )
    }

    // Generate email templates
    const customerEmailContent = generateOrderConfirmationEmail(order)
    const adminEmailContent = generateAdminOrderNotificationEmail(order)

    // Send both emails using your /api/send-email route
    try {
      await Promise.allSettled([
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: order.customerEmail,
            subject: `Order Confirmation - ${order.orderReference}`,
            html: customerEmailContent.html,
            text: customerEmailContent.text,
          }),
        }),

        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            subject: `New Order Received - ${order.orderReference}`,
            html: adminEmailContent.html,
            text: adminEmailContent.text,
          }),
        }),
      ])
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Do not fail order creation if emails fail
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderReference,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    )
  }
}
