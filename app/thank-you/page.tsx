"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CheckCircle, Package, Mail, MessageCircle, Home, Loader2 } from "lucide-react"
import type { Order } from "@/lib/types"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const orderRef = searchParams.get("ref")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderRef) {
      fetchOrder(orderRef)
    } else {
      setLoading(false)
    }
  }, [orderRef])

  const fetchOrder = async (reference: string) => {
    try {
      const response = await fetch(`/api/orders/get?reference=${reference}`)
      const data = await response.json()
      if (data.order) {
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Failed to fetch order:", error)
    } finally {
      setLoading(false)
    }
  }

  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi Honeystixx team, I just completed my order ${orderRef || ""} and would like to confirm delivery.`
      )}`
    : null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <Card className="max-w-2xl mx-auto p-12 text-center border-pink-100">
            <h1 className="font-serif text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We could not find your order. Please check your email for order confirmation details.
            </p>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link href="/">
                Go Back
              </Link>
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Your Order Was Successful!</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Thank you for purchasing Honeystixx. A confirmation email has been sent to your inbox with your order
              details. Our team will contact you shortly regarding delivery.
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="p-8 border-pink-100 mb-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-pink-100">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-2">Order Summary</h2>
                <p className="text-sm text-muted-foreground">
                  Order placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-base px-4 py-2">Payment Confirmed</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Customer Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{order.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{order.customerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Order Reference */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Order Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Reference:</span>
                    <span className="font-mono font-bold text-primary">{order.orderReference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Status:</span>
                    <span className="font-medium capitalize">{order.orderStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="text-sm text-muted-foreground">
                        Unit Price: ₦
                        {item.price.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <p className="font-semibold text-primary">
                      ₦
                      {(item.price * item.quantity).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm leading-relaxed">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center pt-6 border-t-2 border-primary">
              <span className="text-xl font-semibold">Total Amount Paid</span>
              <span className="text-3xl font-bold text-primary">
                ₦
                {order.totalAmount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </Card>

          {/* Action Buttons
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white">
              <Link href="/">
                <Home className="mr-2 w-5 h-5" />
                Return to Homepage
              </Link>
            </Button>

            {whatsappLink && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-pink-50 bg-transparent"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Contact Us on WhatsApp
                </a>
              </Button>
            )}
          </div> */}

          {/* Additional Information */}
          <Card className="p-6 border-pink-100 bg-gradient-to-br from-pink-50 to-white">
            <h3 className="font-semibold text-lg mb-4 text-center">What Happens Next?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Email Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for a detailed order confirmation email
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Order Processing</h4>
                <p className="text-sm text-muted-foreground">
                  We will prepare your order for shipment within 1-2 days
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Delivery Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you with shipping and delivery details
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
