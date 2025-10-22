"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderForm } from "@/components/order-form"
import { Card } from "@/components/ui/card"
import { getProduct } from "@/lib/firebase/firestore"
import type { Product } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function OrderPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const productData = await getProduct()
      setProduct(productData)
      setLoading(false)
    }
    fetchProduct()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product || !product.available) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-32">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Product Currently Unavailable</h1>
            <p className="text-muted-foreground mb-8">
              We're sorry, but this product is currently not available for purchase. Please check back later or contact
              us for more information.
            </p>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-200">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
              Complete Your <span className="text-primary">Order</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Fill in your details below to order your Honeystixx health diagnosis kit
            </p>
          </div>

          <OrderForm product={product} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
