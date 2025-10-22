"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2 } from "lucide-react"

export default function ComplaintsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    orderReference: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    complaintType: "",
    subject: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerName.trim()) newErrors.customerName = "Name is required"
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail))
      newErrors.customerEmail = "Invalid email format"
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Phone number is required"
    if (!formData.complaintType) newErrors.complaintType = "Complaint type is required"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/complaints/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/complaints/success")
      } else {
        alert("Failed to submit complaint. Please try again.")
      }
    } catch (error) {
      console.error("Complaint submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Submit a Complaint</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We're sorry you're experiencing an issue. Please provide details below and our team will address your
              concern promptly.
            </p>
          </div>

          <Card className="p-8 border-pink-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="orderReference">Order Reference (Optional)</Label>
                <Input
                  id="orderReference"
                  name="orderReference"
                  value={formData.orderReference}
                  onChange={handleInputChange}
                  placeholder="HNY-XXXXX-XXXX"
                />
                <p className="text-sm text-muted-foreground mt-1">If your complaint is related to an order</p>
              </div>

              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Kemi Daramola"
                  className={errors.customerName ? "border-red-500" : ""}
                />
                {errors.customerName && <p className="text-sm text-red-500 mt-1">{errors.customerName}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="oluwakemi@example.com"
                    className={errors.customerEmail ? "border-red-500" : ""}
                  />
                  {errors.customerEmail && <p className="text-sm text-red-500 mt-1">{errors.customerEmail}</p>}
                </div>

                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    className={errors.customerPhone ? "border-red-500" : ""}
                  />
                  {errors.customerPhone && <p className="text-sm text-red-500 mt-1">{errors.customerPhone}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="complaintType">Complaint Type *</Label>
                <Select
                  value={formData.complaintType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, complaintType: value }))
                    if (errors.complaintType) {
                      setErrors((prev) => ({ ...prev, complaintType: "" }))
                    }
                  }}
                >
                  <SelectTrigger className={errors.complaintType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product Quality</SelectItem>
                    <SelectItem value="delivery">Delivery Issue</SelectItem>
                    <SelectItem value="payment">Payment Problem</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.complaintType && <p className="text-sm text-red-500 mt-1">{errors.complaintType}</p>}
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of the issue"
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide as much detail as possible about your complaint..."
                  rows={6}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
