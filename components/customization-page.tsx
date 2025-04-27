"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Scissors, Shirt, Ruler, Palette, FileText, ShoppingCart, Check } from "lucide-react"

// Mock data - in a real app, this would come from your database
const fabricTypes = [
  { id: "cotton", name: "Cotton", price: 20 },
  { id: "linen", name: "Linen", price: 30 },
  { id: "silk", name: "Silk", price: 50 },
  { id: "wool", name: "Wool", price: 40 },
  { id: "polyester", name: "Polyester", price: 15 },
]

const colors = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Black", hex: "#000000" },
  { id: "navy", name: "Navy Blue", hex: "#000080" },
  { id: "red", name: "Red", hex: "#FF0000" },
  { id: "green", name: "Green", hex: "#008000" },
  { id: "beige", name: "Beige", hex: "#F5F5DC" },
]

const garmentTypes = [
  { id: "shirt", name: "Shirt", basePrice: 50 },
  { id: "pants", name: "Pants", basePrice: 70 },
  { id: "dress", name: "Dress", basePrice: 90 },
  { id: "skirt", name: "Skirt", basePrice: 60 },
  { id: "jacket", name: "Jacket", basePrice: 120 },
]

const styles = {
  shirt: [
    { id: "classic", name: "Classic" },
    { id: "slim", name: "Slim Fit" },
    { id: "oversized", name: "Oversized" },
  ],
  pants: [
    { id: "straight", name: "Straight Leg" },
    { id: "skinny", name: "Skinny" },
    { id: "wide", name: "Wide Leg" },
  ],
  dress: [
    { id: "aline", name: "A-Line" },
    { id: "bodycon", name: "Bodycon" },
    { id: "maxi", name: "Maxi" },
  ],
  skirt: [
    { id: "pencil", name: "Pencil" },
    { id: "pleated", name: "Pleated" },
    { id: "mini", name: "Mini" },
  ],
  jacket: [
    { id: "blazer", name: "Blazer" },
    { id: "bomber", name: "Bomber" },
    { id: "denim", name: "Denim" },
  ],
}

export function CustomizationPage() {
  const [activeTab, setActiveTab] = useState("garment")
  const [garmentType, setGarmentType] = useState("")
  const [style, setStyle] = useState("")
  const [fabric, setFabric] = useState("")
  const [color, setColor] = useState("")
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hips: "",
    length: "",
    shoulders: "",
    sleeves: "",
  })
  const [notes, setNotes] = useState("")

  const calculatePrice = () => {
    if (!garmentType || !fabric) return 0

    const selectedGarment = garmentTypes.find((g) => g.id === garmentType)
    const selectedFabric = fabricTypes.find((f) => f.id === fabric)

    if (!selectedGarment || !selectedFabric) return 0

    return selectedGarment.basePrice + selectedFabric.price
  }

  const handleNextStep = () => {
    const tabs = ["garment", "fabric", "measurements", "review"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePreviousStep = () => {
    const tabs = ["garment", "fabric", "measurements", "review"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const isTabComplete = (tab: string) => {
    switch (tab) {
      case "garment":
        return !!garmentType && !!style
      case "fabric":
        return !!fabric && !!color
      case "measurements":
        return Object.values(measurements).some((m) => !!m)
      default:
        return true
    }
  }

  const canProceedToCheckout = () => {
    return isTabComplete("garment") && isTabComplete("fabric") && isTabComplete("measurements")
  }

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customize Your Outfit</h1>
        <p className="text-muted-foreground">Design your perfect garment with our easy-to-use customization tool</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="garment" className="flex flex-col items-center gap-2 py-4">
                <Shirt className="h-5 w-5" />
                <span>Garment</span>
              </TabsTrigger>
              <TabsTrigger value="fabric" className="flex flex-col items-center gap-2 py-4">
                <Palette className="h-5 w-5" />
                <span>Fabric & Color</span>
              </TabsTrigger>
              <TabsTrigger value="measurements" className="flex flex-col items-center gap-2 py-4">
                <Ruler className="h-5 w-5" />
                <span>Measurements</span>
              </TabsTrigger>
              <TabsTrigger value="review" className="flex flex-col items-center gap-2 py-4">
                <FileText className="h-5 w-5" />
                <span>Review</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="garment" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="garment-type">Select Garment Type</Label>
                <Select value={garmentType} onValueChange={setGarmentType}>
                  <SelectTrigger id="garment-type">
                    <SelectValue placeholder="Choose a garment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {garmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} (Base Price: ${type.basePrice})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {garmentType && (
                <div className="space-y-4">
                  <Label>Select Style</Label>
                  <RadioGroup value={style} onValueChange={setStyle}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {styles[garmentType as keyof typeof styles]?.map((styleOption) => (
                        <Label
                          key={styleOption.id}
                          htmlFor={`style-${styleOption.id}`}
                          className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value={styleOption.id} id={`style-${styleOption.id}`} className="sr-only" />
                          <img
                            src="/placeholder.svg?height=100&width=100"
                            alt={styleOption.name}
                            className="w-full aspect-square object-cover rounded-md"
                          />
                          <span className="font-medium">{styleOption.name}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleNextStep} disabled={!isTabComplete("garment")}>
                  Next Step
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="fabric" className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="fabric-type">Select Fabric</Label>
                <Select value={fabric} onValueChange={setFabric}>
                  <SelectTrigger id="fabric-type">
                    <SelectValue placeholder="Choose a fabric type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fabricTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} (+${type.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Select Color</Label>
                <RadioGroup value={color} onValueChange={setColor} className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {colors.map((colorOption) => (
                    <Label
                      key={colorOption.id}
                      htmlFor={`color-${colorOption.id}`}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <RadioGroupItem value={colorOption.id} id={`color-${colorOption.id}`} className="sr-only" />
                      <div
                        className="w-12 h-12 rounded-full border-2 transition-all [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-primary [&:has([data-state=checked])]:ring-offset-2"
                        style={{
                          backgroundColor: colorOption.hex,
                          borderColor: colorOption.hex === "#FFFFFF" ? "#e2e8f0" : colorOption.hex,
                        }}
                      />
                      <span className="text-sm">{colorOption.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Previous Step
                </Button>
                <Button onClick={handleNextStep} disabled={!isTabComplete("fabric")}>
                  Next Step
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="measurements" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Your Measurements</Label>
                  <Button variant="link" className="text-sm">
                    How to measure
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (inches)</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="e.g., 40"
                      value={measurements.chest}
                      onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (inches)</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g., 32"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (inches)</Label>
                    <Input
                      id="hips"
                      type="number"
                      placeholder="e.g., 42"
                      value={measurements.hips}
                      onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">Length (inches)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="e.g., 28"
                      value={measurements.length}
                      onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shoulders">Shoulders (inches)</Label>
                    <Input
                      id="shoulders"
                      type="number"
                      placeholder="e.g., 18"
                      value={measurements.shoulders}
                      onChange={(e) => setMeasurements({ ...measurements, shoulders: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sleeves">Sleeves (inches)</Label>
                    <Input
                      id="sleeves"
                      type="number"
                      placeholder="e.g., 24"
                      value={measurements.sleeves}
                      onChange={(e) => setMeasurements({ ...measurements, sleeves: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements or details you'd like us to know..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Previous Step
                </Button>
                <Button onClick={handleNextStep} disabled={!isTabComplete("measurements")}>
                  Review Order
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="garment">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center gap-2">
                          <Shirt className="h-5 w-5" />
                          <span>Garment Details</span>
                          {isTabComplete("garment") && <Check className="h-4 w-4 text-green-500 ml-2" />}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {garmentType ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span className="font-medium">
                                {garmentTypes.find((g) => g.id === garmentType)?.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Style:</span>
                              <span className="font-medium">
                                {styles[garmentType as keyof typeof styles]?.find((s) => s.id === style)?.name}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No garment selected</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="fabric">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          <span>Fabric & Color</span>
                          {isTabComplete("fabric") && <Check className="h-4 w-4 text-green-500 ml-2" />}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {fabric && color ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Fabric:</span>
                              <span className="font-medium">{fabricTypes.find((f) => f.id === fabric)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Color:</span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: colors.find((c) => c.id === color)?.hex }}
                                />
                                <span className="font-medium">{colors.find((c) => c.id === color)?.name}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No fabric or color selected</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="measurements">
                      <AccordionTrigger className="text-base">
                        <div className="flex items-center gap-2">
                          <Ruler className="h-5 w-5" />
                          <span>Measurements</span>
                          {isTabComplete("measurements") && <Check className="h-4 w-4 text-green-500 ml-2" />}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {Object.values(measurements).some((m) => !!m) ? (
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(measurements).map(
                              ([key, value]) =>
                                value && (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-muted-foreground capitalize">{key}:</span>
                                    <span className="font-medium">{value} inches</span>
                                  </div>
                                ),
                            )}
                            {notes && (
                              <div className="col-span-2 mt-2">
                                <span className="text-muted-foreground">Additional Notes:</span>
                                <p className="mt-1">{notes}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No measurements provided</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Previous Step
                </Button>
                <Button disabled={!canProceedToCheckout()}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Custom Design</h3>

              <div className="aspect-[3/4] bg-muted rounded-md mb-6 flex items-center justify-center">
                {garmentType && fabric && color ? (
                  <img
                    src="/placeholder.svg?height=400&width=300"
                    alt="Custom design preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Scissors className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Select options to see your design preview</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price:</span>
                  <span>
                    ${garmentType ? garmentTypes.find((g) => g.id === garmentType)?.basePrice.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fabric:</span>
                  <span>${fabric ? fabricTypes.find((f) => f.id === fabric)?.price.toFixed(2) : "0.00"}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Customization Fee:</span>
                  <span>$25.00</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total Price:</span>
                  <span>${(calculatePrice() + 25).toFixed(2)}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Custom orders typically take 2-3 weeks for production after approval.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
