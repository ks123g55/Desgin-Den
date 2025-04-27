import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomizationPreview } from "@/components/customization-preview"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-12 py-6">
        <HeroSection />
        <FeaturedProducts />
        <CustomizationPreview />
        <Testimonials />
      </div>
    </MainLayout>
  )
}
