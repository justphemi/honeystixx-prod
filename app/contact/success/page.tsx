"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, MessageCircle, Home } from "lucide-react"

export default function ContactSuccessPage() {
  const searchParams = useSearchParams()
  const whatsappNumber = searchParams.get("whatsapp")

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Honeystixx team, I just submitted a contact form and would like to connect with you.")}`
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <Card className="max-w-2xl mx-auto p-12 text-center border-pink-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">Message Sent Successfully!</h1>

          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Thank you for reaching out to Honeystixx. We've received your message and will get back to you within 24
            hours. A confirmation email has been sent to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link href="/">
                <Home className="mr-2 w-4 h-4" />
                Return to Homepage
              </Link>
            </Button>

            {whatsappLink && (
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-pink-50 bg-transparent">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            )}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
