import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// Mock data - in a real app, this would come from your database
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The custom dress I ordered fits perfectly! The quality of the fabric is excellent, and the attention to detail is impressive.",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "I was skeptical about ordering custom clothing online, but Design Den exceeded my expectations. The suit I ordered is now my favorite piece in my wardrobe.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The customization process was so easy and fun! I created a unique blouse that I couldn't find anywhere else, and it arrived exactly as I designed it.",
  },
]

export function Testimonials() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
        <p className="text-muted-foreground mt-2">
          Don't just take our word for it - hear from our satisfied customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground flex-1">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
