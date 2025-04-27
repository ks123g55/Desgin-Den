import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Style, <span className="text-primary">Your Way</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse our collection of ready-to-wear clothing or create your own custom designs tailored to your exact
            measurements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/customize">Customize</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <img
            src="/placeholder.svg?height=600&width=600"
            alt="Fashion collection"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
