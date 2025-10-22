export interface Product {
  id: string
  name: string
  price: number
  discount: number
  description: string
  imageUrl: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderReference: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paystackReference?: string
  createdAt: Date
  updatedAt: Date
}

export interface FormSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  formType: "contact" | "inquiry"
  status: "new" | "read" | "responded"
  createdAt: Date
}

export interface Complaint {
  id: string
  orderReference?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  complaintType: "product" | "delivery" | "payment" | "other"
  subject: string
  description: string
  status: "pending" | "in-progress" | "resolved" | "closed"
  adminResponse?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}
