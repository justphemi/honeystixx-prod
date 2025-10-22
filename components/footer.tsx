import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8"> 

          <div>
            <h4 className="font-semibold tangerine-regular mb-4">Actions</h4>
            <ul className="space-y-2 text-sm"> 
              <li>
                <Link href="/order" className="text-muted-foreground hover:text-primary transition-colors">
                  Get your honeystixx
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit Complaint
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold tangerine-regular mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="tel:0800011223344" className="text-muted-foreground hover:text-primary transition-colors">
                Call  08059839847
                </Link>
              </li>
              <li>
                <Link href="mailto:Honeystixxpro@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Email US: Honeystixxpro@gmail.com
                </Link>
              </li>
            </ul>
          </div>

         
        </div>

        <div className="border-t border-pink-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Honeystixx. All rights reserved.</p>
          {/* <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for women's health
          </p> */}
        </div>
      </div>
    </footer>
  )
}
