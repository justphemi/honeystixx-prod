"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Loader2 } from "lucide-react"
import type { Order } from "@/lib/types"
import { exportOrdersToCSV, downloadCSV } from "@/lib/utils/csv-export"

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const csv = exportOrdersToCSV(filteredOrders)
    downloadCSV(csv, `orders-${new Date().toISOString().split("T")[0]}.csv`)
  }

  const handleStatusUpdate = async (orderId: string, status: string, type: "payment" | "order") => {
    try {
      await fetch("/api/admin/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          updates: type === "payment" ? { paymentStatus: status } : { orderStatus: status },
        }),
      })
      fetchOrders()
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true
    if (filter === "pending") return order.paymentStatus === "pending"
    if (filter === "paid") return order.paymentStatus === "paid"
    if (filter === "shipped") return order.orderStatus === "shipped"
    if (filter === "refunded") return order.paymentStatus === "refunded"
    return true
  })

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending Payment</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center border-pink-100">
            <p className="text-muted-foreground">No orders found</p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-6 border-pink-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{order.orderReference}</h3>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                    <Badge className={getOrderStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName} • {order.customerEmail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-primary">₦{(order.totalAmount).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium mb-1">Items</p>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {item.productName} × {item.quantity}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Shipping Address</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Select
                  value={order.paymentStatus}
                  onValueChange={(value) => handleStatusUpdate(order.id, value, "payment")}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={order.orderStatus}
                  onValueChange={(value) => handleStatusUpdate(order.id, value, "order")}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
