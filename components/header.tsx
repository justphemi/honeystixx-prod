"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-serif font-bold text-primary">Honeystixx</div>
        </Link>
{/* 
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#product" className="text-sm font-medium hover:text-primary transition-colors">
            Product
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav> */}

        <div className="flex items-center gap-4">
          <Button asChild variant="default" className="bg-primary hover:bg-primary-hover text-white">
            <Link href="/order">Order Now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
