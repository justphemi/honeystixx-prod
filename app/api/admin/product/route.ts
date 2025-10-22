import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth/admin"
import { getProduct } from "@/lib/firebase/firestore"

export async function GET(request: NextRequest) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const product = await getProduct()
    return NextResponse.json({ product })
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
