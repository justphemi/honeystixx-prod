import { NextResponse } from "next/server"
import { destroyAdminSession } from "@/lib/auth/admin"

export async function POST() {
  try {
    await destroyAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 })
  }
}
