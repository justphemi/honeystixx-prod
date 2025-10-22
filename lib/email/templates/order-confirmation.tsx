import type { Order } from "@/lib/types"

export function generateOrderConfirmationEmail(order: Order) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Honeystixx</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #fef5f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #e91e63 0%, #f8bbd0 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Honeystixx</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">Order Confirmation</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #2d2d2d; font-size: 24px;">Thank you for your order!</h2>
              <p style="margin: 0 0 20px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                Hi ${order.customerName},
              </p>
              <p style="margin: 0 0 30px; color: #6d6d6d; font-size: 16px; line-height: 1.6;">
                We've received your order and will process it shortly. You'll receive another email once your order has been shipped.
              </p>
              
               Order Details 
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef5f8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px; color: #e91e63; font-size: 18px;">Order Details</h3>
                    <p style="margin: 0 0 8px; color: #2d2d2d; font-size: 14px;">
                      <strong>Order Reference:</strong> ${order.orderReference}
                    </p>
                    <p style="margin: 0 0 8px; color: #2d2d2d; font-size: 14px;">
                      <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p style="margin: 0; color: #2d2d2d; font-size: 14px;">
                      <strong>Payment Status:</strong> <span style="color: #4caf50;">${order.paymentStatus}</span>
                    </p>
                  </td>
                </tr>
              </table>
              
               Items 
              <h3 style="margin: 0 0 15px; color: #2d2d2d; font-size: 18px;">Items Ordered</h3>
              ${order.items
                .map(
                  (item) => `
                <div style="padding: 15px 0; border-bottom: 1px solid #f8bbd0;">
                  <p style="margin: 0 0 5px; color: #2d2d2d; font-size: 16px; font-weight: bold;">${item.productName}</p>
                  <p style="margin: 0; color: #6d6d6d; font-size: 14px;">Quantity: ${item.quantity} × ₦${item.price.toFixed(2)}</p>
                </div>
              `,
                )
                .join("")}
              
               Total 
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr>
                  <td style="text-align: right; padding: 15px 0; border-top: 2px solid #e91e63;">
                    <p style="margin: 0; color: #2d2d2d; font-size: 20px; font-weight: bold;">
                      Total: <span style="color: #e91e63;">₦${order.totalAmount.toFixed(2)}</span>
                    </p>
                  </td>
                </tr>
              </table>
              
              <h3 style="margin: 30px 0 15px; color: #2d2d2d; font-size: 18px;">Shipping Address</h3>
              <p style="margin: 0; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                ${order.shippingAddress.street}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                ${order.shippingAddress.country}
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; padding: 15px 40px; background-color: #e91e63; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">Visit Our Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
            
          <tr>
            <td style="background-color: #fef5f8; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #6d6d6d; font-size: 14px;">
                Questions? Contact us at ${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"} or call ${`${process.env.ADMIN_NUMBER}` || "08000112233"}
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
Order Confirmation - Honeystixx

Thank you for your order, ${order.customerName}!

Order Reference: ${order.orderReference}
Order Date: ${new Date(order.createdAt).toLocaleDateString()} at ${new Date(order.createdAt).toLocaleTimeString()}

Items Ordered:
${order.items.map((item) => `- ${item.productName} × ${item.quantity} (₦${item.price.toFixed(2)})`).join("\n")}

Total: ₦${order.totalAmount.toFixed(2)}

Shipping Address:
${order.shippingAddress.street}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

We've received your order and will process it shortly. You'll receive another email once your order has been shipped.

Questions? Contact us at ${`${process.env.ADMIN_EMAIL}` || "support@honeystixx.com"}

© ${new Date().getFullYear()} Honeystixx. All rights reserved.
  `

  return { html, text }
}
