"use client"

import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { OrdersTab } from "./orders-tab"
import { FormsTab } from "./forms-tab"
import { ComplaintsTab } from "./complaints-tab"
import { ProductTab } from "./product-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, FileText, AlertCircle, ShoppingBag } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Sales Records</h1>
          <p className="text-muted-foreground">Manage orders, forms, complaints, and product settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            {/* <TabsTrigger value="forms" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Forms</span>
            </TabsTrigger> */}
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="product" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Product</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="forms">
            <FormsTab />
          </TabsContent>

          <TabsContent value="complaints">
            <ComplaintsTab />
          </TabsContent>

          <TabsContent value="product">
            <ProductTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
