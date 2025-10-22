"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Premium Women's Health</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Your Health, <span className="text-primary">Your Power</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
              Honeystixx is a comprehensive women's health diagnosis kit designed to empower you with knowledge about
              your body. Take control of your wellness journey with our easy-to-use, accurate testing solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white text-lg px-8">
                <Link href="/order">
                  Get your honeystixx
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary text-primary hover:bg-pink-50 bg-transparent"
              >
                <Link href="#product">Learn More</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">FDA Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">99% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Easy to Use</span>
              </div>
            </div>
          </div>

          {/* Right content - Product image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl transform rotate-6" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Honeystixx Product"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
