"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import type { Product } from "@/lib/types"

export function ProductTab() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/admin/product")
      const data = await response.json()
      setProduct(data.product)
    } catch (error) {
      console.error("Failed to fetch product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!product) return

    setSaving(true)
    try {
      await fetch("/api/admin/product/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      alert("Product updated successfully!")
    } catch (error) {
      console.error("Failed to update product:", error)
      alert("Failed to update product")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <Card className="p-12 text-center border-pink-100">
        <p className="text-muted-foreground">No product found</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-pink-100">
      <h2 className="font-serif text-2xl font-bold mb-6">Product Settings</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (₦)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              step="any"
              value={product.discount}
              onChange={(e) => setProduct({ ...product, discount: Number.parseFloat(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
          <div>
            <Label htmlFor="available" className="text-base font-semibold">
              Product Available
            </Label>
            <p className="text-sm text-muted-foreground">Toggle product availability for customers</p>
          </div>
          <Switch
            id="available"
            checked={product.available}
            onCheckedChange={(checked) => setProduct({ ...product, available: checked })}
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary-hover text-white">
          {saving ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
