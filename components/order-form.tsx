"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart, Loader2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

// Dynamically import PaystackButton
const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), {
  ssr: false,
})

interface OrderFormProps {
  product: Product
}

export function OrderForm({ product }: OrderFormProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setIsClient(true)
  }, [])

  const finalPrice = product.discount / 100 * product.price
  const totalAmount = Number.isNaN(finalPrice * quantity) ? 0 : finalPrice * quantity

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.street.trim()) newErrors.street = "Street address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePaystackSuccess = async (reference: any) => {
    setLoading(true)
    setProcessing(true)
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
          items: [
            {
              productId: product.id,
              productName: product.name,
              quantity,
              price: finalPrice,
            },
          ],
          totalAmount,
          paystackReference: reference.reference,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/thank-you?ref=${data.orderReference}`)
      } else {
        setProcessing(false)
        alert("Failed to create order. Please contact support.")
      }
    } catch (error) {
      console.error("Order creation error:", error)
      setProcessing(false)
      alert("An error occurred. Please contact support.")
    } finally {
      setLoading(false)
    }
  }

  const handlePaystackClose = () => {
    setProcessing(true)
  }

  const componentProps = {
    email: formData.email,
    amount: totalAmount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    text: "Proceed to Payment",
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateForm()
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone &&
    formData.street &&
    formData.city &&
    formData.state &&
    formData.zipCode &&
    formData.country

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-pink-500">
              <h2 className="font-serif text-2xl font-bold mb-1">Personal Information</h2>
              <div className="space-y-4">
                <div className="gap-3 flex flex-col">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Kemi Daramola"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="oluwakemi@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 801 234 5678"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-pink-100">
              <h2 className="font-serif text-2xl font-bold mb-1">Shipping Information</h2>
              <div className="space-y-4">
                <div className="gap-3 flex flex-col">
                  <Label htmlFor="street"> Address *</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apt 4B"
                    className={errors.street ? "border-red-500" : ""}
                  />
                  {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Lagos"
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Lagos State"
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="100001"
                      className={errors.zipCode ? "border-red-500" : ""}
                    />
                    {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
                  </div>
                  <div className="gap-3 flex flex-col">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Nigeria"
                      className={errors.country ? "border-red-500" : ""}
                    />
                    {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* Right Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-pink-100 sticky top-24">
              <h2 className="font-serif text-2xl font-bold mb-1">Order Summary</h2>
              <div className="space-y-4 mb-1">
                <div className="flex gap-4">
                  <div className="w-8 p-2 h-8 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-pink-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per unit</span>
                    <span>
                      {product.discount > 0 && (
                        <span className="line-through text-muted-foreground mr-2">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                      {formatCurrency(finalPrice)}
                    </span>
                  </div>
                  {product.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency((product.price - finalPrice) * quantity)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-pink-100">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              {isFormValid && formData.email && isClient ? (
                <PaystackButton
                  {...componentProps}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    validateForm()
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Form to Continue"
                  )}
                </Button>
              )}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure payment powered by Paystack. Your information is encrypted and secure.
              </p>
            </Card>
          </div>
        </div>
      </form>
      <AnimatePresence>
        {processing && (
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium text-gray-700">Finalizing your order, please wait...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}