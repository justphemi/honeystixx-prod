import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/auth/admin"
import { updateFormSubmission } from "@/lib/firebase/firestore"

export async function POST(request: NextRequest) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { formId, updates } = await request.json()
    await updateFormSubmission(formId, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update form:", error)
    return NextResponse.json({ error: "Failed to update form" }, { status: 500 })
  }
}
