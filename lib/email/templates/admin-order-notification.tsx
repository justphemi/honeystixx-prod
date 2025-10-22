import type { Order } from "@/lib/types"

export function generateAdminOrderNotificationEmail(order: Order) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - Honeystixx Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background-color: #e91e63; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">New Order Received</h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #2d2d2d; font-size: 20px;">Order #${order.orderReference}</h2>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="color: #6d6d6d; font-size: 14px;"><strong>Customer:</strong></td>
                  <td style="color: #2d2d2d; font-size: 14px;">${order.customerName}</td>
                </tr>
                <tr>
                  <td style="color: #6d6d6d; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="color: #2d2d2d; font-size: 14px;">${order.customerEmail}</td>
                </tr>
                <tr>
                  <td style="color: #6d6d6d; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="color: #2d2d2d; font-size: 14px;">${order.customerPhone}</td>
                </tr>
                <tr>
                  <td style="color: #6d6d6d; font-size: 14px;"><strong>Total:</strong></td>
                  <td style="color: #e91e63; font-size: 16px; font-weight: bold;">₦${order.totalAmount.toFixed(2)}</td>
                </tr>
              </table>
              
              <h3 style="margin: 20px 0 10px; color: #2d2d2d; font-size: 16px;">Items:</h3>
              ${order.items.map((item) => `<p style="margin: 5px 0; color: #6d6d6d; font-size: 14px;">• ${item.productName} × ${item.quantity}</p>`).join("")}
              
              <h3 style="margin: 20px 0 10px; color: #2d2d2d; font-size: 16px;">Shipping Address:</h3>
              <p style="margin: 0; color: #6d6d6d; font-size: 14px; line-height: 1.6;">
                ${order.shippingAddress.street}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                ${order.shippingAddress.country}
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" style="display: inline-block; padding: 12px 30px; background-color: #e91e63; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold;">View in Admin Dashboard</a>
                  </td>
                </tr>
              </table>
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
New Order Received - Honeystixx

Order #${order.orderReference}

Customer: ${order.customerName}
Email: ${order.customerEmail}
Phone: ${order.customerPhone}
Total: ₦${order.totalAmount.toFixed(2)}

Items:
${order.items.map((item) => `- ${item.productName} × ${item.quantity}`).join("\n")}

Shipping Address:
${order.shippingAddress.street}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

View in Admin Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard
  `

  return { html, text }
}
