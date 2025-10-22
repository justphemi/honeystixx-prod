import type { Order, FormSubmission, Complaint } from "../types"

export function exportOrdersToCSV(orders: Order[]): string {
  const headers = [
    "Order Reference",
    "Customer Name",
    "Email",
    "Phone",
    "Address",
    "Items",
    "Quantity",
    "Total Amount",
    "Payment Status",
    "Order Status",
    "Date",
  ]

  const rows = orders.map((order) => [
    order.orderReference,
    order.customerName,
    order.customerEmail,
    order.customerPhone,
    `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`,
    order.items.map((item) => item.productName).join("; "),
    order.items.reduce((sum, item) => sum + item.quantity, 0),
    order.totalAmount,
    order.paymentStatus,
    order.orderStatus,
    order.createdAt.toLocaleDateString(),
  ])

  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}

export function exportFormsToCSV(forms: FormSubmission[]): string {
  const headers = ["Name", "Email", "Phone", "Message", "Type", "Status", "Date"]

  const rows = forms.map((form) => [
    form.name,
    form.email,
    form.phone,
    `"${form.message.replace(/"/g, '""')}"`,
    form.formType,
    form.status,
    form.createdAt.toLocaleDateString(),
  ])

  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}

export function exportComplaintsToCSV(complaints: Complaint[]): string {
  const headers = [
    "Customer Name",
    "Email",
    "Phone",
    "Order Reference",
    "Type",
    "Subject",
    "Description",
    "Status",
    "Admin Response",
    "Date",
  ]

  const rows = complaints.map((complaint) => [
    complaint.customerName,
    complaint.customerEmail,
    complaint.customerPhone,
    complaint.orderReference || "N/A",
    complaint.complaintType,
    complaint.subject,
    `"${complaint.description.replace(/"/g, '""')}"`,
    complaint.status,
    complaint.adminResponse ? `"${complaint.adminResponse.replace(/"/g, '""')}"` : "N/A",
    complaint.createdAt.toLocaleDateString(),
  ])

  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
