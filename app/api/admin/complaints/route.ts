import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth/admin"
import { getAllComplaints } from "@/lib/firebase/firestore"

export async function GET(request: NextRequest) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const complaints = await getAllComplaints()
    return NextResponse.json({ complaints })
  } catch (error) {
    console.error("Failed to fetch complaints:", error)
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
  }
}
