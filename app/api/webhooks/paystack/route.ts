import { type NextRequest, NextResponse } from "next/server"
import { updateOrder, getOrderByReference } from "@/lib/firebase/firestore"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
      .update(body)
      .digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(body)

    // Handle successful payment
    if (event.event === "charge.success") {
      const { reference } = event.data

      // Find order by Paystack reference
      const order = await getOrderByReference(reference)

      if (order) {
        // Update order status
        await updateOrder(order.id, {
          paymentStatus: "paid",
          orderStatus: "processing",
        })

        // Send confirmation emails
        try {
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/emails/payment-confirmed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: order.id }),
          })
        } catch (emailError) {
          console.error("Email sending failed:", emailError)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
