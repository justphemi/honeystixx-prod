"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Check, Package, Clock, Shield } from "lucide-react"

export function ProductSection() {
  return (
    <section id="product" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            Meet <span className="text-primary">Honeystixx</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive health diagnosis kit designed specifically for women's unique health needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Product image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-12">
              <img
                src="/placeholder.svg?height=800&width=800"
                alt="Honeystixx Kit Contents"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-1 bg-pink-100 text-primary rounded-full text-sm font-medium mb-4">
                Premium Quality
              </div>
              <h3 className="font-serif text-3xl font-bold mb-4">What's Inside</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Everything you need for comprehensive health testing, delivered in one elegant package.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Complete testing kit with all necessary components",
                "Easy-to-follow instructions in multiple languages",
                "Secure sample collection materials",
                "Prepaid return envelope for lab analysis",
                "Access to online results portal",
                "Consultation with health professionals",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white">
                <Link href="/order">Order Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-pink-50 bg-transparent"
              >
                <Link href="/contact">Ask Questions</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="p-8 text-center border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-serif text-xl font-bold mb-3">Discreet Packaging</h4>
            <p className="text-muted-foreground">
              Your privacy matters. All orders arrive in unmarked, secure packaging.
            </p>
          </Card>

          <Card className="p-8 text-center border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-serif text-xl font-bold mb-3">Fast Results</h4>
            <p className="text-muted-foreground">Receive your comprehensive health results within 3-5 business days.</p>
          </Card>

          <Card className="p-8 text-center border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-serif text-xl font-bold mb-3">Certified & Safe</h4>
            <p className="text-muted-foreground">
              FDA approved and certified by leading health organizations worldwide.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
