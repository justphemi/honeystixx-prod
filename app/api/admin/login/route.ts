import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminPassword, createAdminSession } from "@/lib/auth/admin"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const isValid = await verifyAdminPassword(password)

    if (isValid) {
      await createAdminSession()
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
