import { redirect } from "next/navigation"
import { verifyAdminSession } from "@/lib/auth/admin"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminDashboardPage() {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
