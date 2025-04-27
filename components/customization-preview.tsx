import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors } from "lucide-react"

export function CustomizationPreview() {
  return (
    <section className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20">
        <img
          src="/placeholder.svg?height=500&width=1200"
          alt="Customization"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="relative py-16 px-6 md:py-24 md:px-12 text-white">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Scissors className="h-5 w-5" />
            <span className="font-medium">Custom Tailoring</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Design Your Perfect Outfit</h2>

          <p className="text-lg md:text-xl opacity-90">
            Choose your fabric, color, style, and provide your measurements for a perfectly tailored garment that fits
            you exactly as you want.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/customize">Start Designing</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
