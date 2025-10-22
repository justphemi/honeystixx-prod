import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth/admin"
import { getAllFormSubmissions } from "@/lib/firebase/firestore"

export async function GET(request: NextRequest) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const forms = await getAllFormSubmissions()
    return NextResponse.json({ forms })
  } catch (error) {
    console.error("Failed to fetch forms:", error)
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 })
  }
}
