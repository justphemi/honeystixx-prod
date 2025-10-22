import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Home } from "lucide-react"

export default function ComplaintSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <Card className="max-w-2xl mx-auto p-12 text-center border-pink-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            Complaint Submitted Successfully
          </h1>

          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Thank you for bringing this to our attention. We take all complaints seriously and our team will review your
            case within 24-48 hours. You'll receive a response via email once we've investigated the matter.
          </p>

          <Button asChild className="bg-primary hover:bg-primary-hover text-white">
            <Link href="/">
              <Home className="mr-2 w-4 h-4" />
              Return to Homepage
            </Link>
          </Button>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
