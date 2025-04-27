"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data - in a real app, this would come from your database
const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: true,
    color: "White",
  },
  {
    id: 2,
    name: "Tailored Black Pants",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Formal",
    isNew: false,
    color: "Black",
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Partywear",
    isNew: true,
    color: "Multicolor",
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: false,
    color: "Blue",
  },
  {
    id: 5,
    name: "Silk Evening Gown",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Partywear",
    isNew: true,
    color: "Red",
  },
  {
    id: 6,
    name: "Linen Blazer",
    price: 119.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Formal",
    isNew: false,
    color: "Beige",
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: false,
    color: "Gray",
  },
  {
    id: 8,
    name: "Wool Sweater",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Casual",
    isNew: true,
    color: "Green",
  },
]

const categories = ["All", "Casual", "Formal", "Partywear"]
const colors = ["All", "White", "Black", "Blue", "Red", "Beige", "Gray", "Green", "Multicolor"]
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Popularity"]

export function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("Newest")

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by category
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false
    }

    // Filter by color
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Popularity":
        return b.isNew ? 1 : -1
      default: // Newest
        return b.id - a.id
    }
  })

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
          <p className="text-muted-foreground">Browse our collection of ready-to-wear clothing</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                {/* Mobile filters - same as desktop but in a sheet */}
                <div className="space-y-4">
                  <h3 className="font-medium">Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="justify-start"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Color</h3>
                  <div className="space-y-2">
                    {colors
                      .filter((color) => color !== "All")
                      .map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => handleColorToggle(color)}
                          />
                          <Label htmlFor={`color-${color}`}>{color}</Label>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] hidden md:flex">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block col-span-3 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Category</h3>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Color</h3>
            <div className="space-y-2">
              {colors
                .filter((color) => color !== "All")
                .map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-desktop-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <Label htmlFor={`color-desktop-${color}`}>{color}</Label>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Price Range</h3>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider defaultValue={[0, 200]} max={200} step={10} value={priceRange} onValueChange={setPriceRange} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-span-12 md:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedColors([])
                  setPriceRange([0, 200])
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  )
}
