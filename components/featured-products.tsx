import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from your database
const featuredProducts = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: true,
  },
  {
    id: 2,
    name: "Tailored Black Pants",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Formal",
    isNew: false,
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Partywear",
    isNew: true,
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: false,
  },
]

export function FeaturedProducts() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <Button variant="outline" asChild>
          <Link href="/shop">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <Link href={`/shop/${product.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {product.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-medium">${product.price}</span>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
              </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
