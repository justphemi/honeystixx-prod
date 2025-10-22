import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}
