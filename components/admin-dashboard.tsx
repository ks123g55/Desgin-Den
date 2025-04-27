"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  DollarSign,
  ShoppingBag,
  Users,
  Scissors,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data - in a real app, this would come from your database
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    status: "Delivered",
    date: "2023-04-23",
    total: 149.99,
    items: 3,
    type: "Ready-made",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "michael@example.com",
    status: "Processing",
    date: "2023-04-22",
    total: 89.99,
    items: 1,
    type: "Custom",
  },
  {
    id: "ORD-003",
    customer: "Emily Rodriguez",
    email: "emily@example.com",
    status: "Shipped",
    date: "2023-04-21",
    total: 199.99,
    items: 2,
    type: "Ready-made",
  },
  {
    id: "ORD-004",
    customer: "David Kim",
    email: "david@example.com",
    status: "Pending",
    date: "2023-04-20",
    total: 129.99,
    items: 1,
    type: "Custom",
  },
  {
    id: "ORD-005",
    customer: "Jessica Lee",
    email: "jessica@example.com",
    status: "Delivered",
    date: "2023-04-19",
    total: 79.99,
    items: 1,
    type: "Ready-made",
  },
]

const pendingCustomizations = [
  {
    id: "CUS-001",
    customer: "Michael Chen",
    garment: "Shirt",
    fabric: "Cotton",
    color: "Navy Blue",
    date: "2023-04-22",
    status: "Pending Approval",
  },
  {
    id: "CUS-002",
    customer: "David Kim",
    garment: "Pants",
    fabric: "Linen",
    color: "Beige",
    date: "2023-04-20",
    status: "Pending Approval",
  },
  {
    id: "CUS-003",
    customer: "Sophia Anderson",
    garment: "Dress",
    fabric: "Silk",
    color: "Red",
    date: "2023-04-18",
    status: "In Production",
  },
]

export function AdminDashboard() {
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin User</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Apr 23, 2023
          </Button>
          <Button size="sm">Generate Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">$15,231.89</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +20.1%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">New Customers</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">+573</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.4%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Products Sold</p>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">1,234</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +8.2%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">Custom Orders</p>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">321</h3>
              <div className="flex items-center text-sm text-red-600">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -4.5%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Compare ready-made vs custom sales</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Sales chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New order #ORD-002</p>
                  <p className="text-xs text-muted-foreground">Michael Chen placed a custom order</p>
                </div>
                <p className="text-xs text-muted-foreground">2m ago</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New customer</p>
                  <p className="text-xs text-muted-foreground">Jessica Lee created an account</p>
                </div>
                <p className="text-xs text-muted-foreground">1h ago</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Scissors className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Custom order approved</p>
                  <p className="text-xs text-muted-foreground">You approved Sophia's custom dress</p>
                </div>
                <p className="text-xs text-muted-foreground">3h ago</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Sales milestone</p>
                  <p className="text-xs text-muted-foreground">Monthly sales target reached</p>
                </div>
                <p className="text-xs text-muted-foreground">1d ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="customizations">Pending Customizations</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and process customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block">
                              <p className="text-sm font-medium">{order.customer}</p>
                              <p className="text-xs text-muted-foreground">{order.email}</p>
                            </div>
                            <p className="md:hidden text-sm">{order.customer}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : order.status === "Processing"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{order.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.total}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Update status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Contact customer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customizations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Customizations</CardTitle>
                <CardDescription>Review and approve custom order requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Garment</TableHead>
                      <TableHead className="hidden md:table-cell">Fabric</TableHead>
                      <TableHead className="hidden md:table-cell">Color</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingCustomizations.map((custom) => (
                      <TableRow key={custom.id}>
                        <TableCell className="font-medium">{custom.id}</TableCell>
                        <TableCell>{custom.customer}</TableCell>
                        <TableCell>{custom.garment}</TableCell>
                        <TableCell className="hidden md:table-cell">{custom.fabric}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  custom.color === "Navy Blue"
                                    ? "#000080"
                                    : custom.color === "Beige"
                                      ? "#F5F5DC"
                                      : custom.color === "Red"
                                        ? "#FF0000"
                                        : "#000000",
                              }}
                            />
                            {custom.color}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={custom.status === "In Production" ? "default" : "outline"}>
                            {custom.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {custom.status === "Pending Approval" && <Button size="sm">Approve</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
