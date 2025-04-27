"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Mail, UserCheck, UserX, Eye, ShieldAlert } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - in a real app, this would come from your database
const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Customer",
    orders: 12,
    lastActive: "2023-04-23",
    joined: "2022-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Customer",
    orders: 8,
    lastActive: "2023-04-22",
    joined: "2022-03-10",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Customer",
    orders: 5,
    lastActive: "2023-04-21",
    joined: "2022-05-22",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Inactive",
    role: "Customer",
    orders: 3,
    lastActive: "2023-03-15",
    joined: "2022-06-30",
  },
  {
    id: 5,
    name: "Jessica Lee",
    email: "jessica@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Customer",
    orders: 7,
    lastActive: "2023-04-19",
    joined: "2022-02-18",
  },
  {
    id: 6,
    name: "Admin User",
    email: "admin@designden.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Admin",
    orders: 0,
    lastActive: "2023-04-23",
    joined: "2021-12-01",
  },
  {
    id: 7,
    name: "Support Staff",
    email: "support@designden.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Active",
    role: "Support",
    orders: 0,
    lastActive: "2023-04-22",
    joined: "2022-01-05",
  },
  {
    id: 8,
    name: "Blocked User",
    email: "blocked@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    status: "Blocked",
    role: "Customer",
    orders: 1,
    lastActive: "2023-02-10",
    joined: "2022-08-15",
  },
]

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false)

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleViewUser = (user: (typeof users)[0]) => {
    setSelectedUser(user)
    setIsUserDetailsOpen(true)
  }

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            Export Users
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead className="hidden md:table-cell">Last Active</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-muted-foreground">No users found</p>
                  <Button variant="link" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "Admin" ? "default" : "outline"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.joined}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.lastActive}</TableCell>
                  <TableCell className="text-center">{user.orders}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : user.status === "Inactive" ? "secondary" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "Blocked" ? (
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Unblock User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <UserX className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                        )}
                        {user.role !== "Admin" && (
                          <DropdownMenuItem>
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            Make Admin
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View and manage user information</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedUser.role === "Admin" ? "default" : "outline"}>{selectedUser.role}</Badge>
                    <Badge
                      variant={
                        selectedUser.status === "Active"
                          ? "default"
                          : selectedUser.status === "Inactive"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Account Created</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{selectedUser.joined}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Last Active</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{selectedUser.lastActive}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{selectedUser.orders}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge
                          variant={
                            selectedUser.status === "Active"
                              ? "default"
                              : selectedUser.status === "Inactive"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-base px-3 py-1"
                        >
                          {selectedUser.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    {selectedUser.status === "Blocked" ? (
                      <Button size="sm">
                        <UserCheck className="mr-2 h-4 w-4" />
                        Unblock User
                      </Button>
                    ) : (
                      <Button variant="destructive" size="sm">
                        <UserX className="mr-2 h-4 w-4" />
                        Block User
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="mt-4">
                  {selectedUser.orders > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">ORD-001</TableCell>
                          <TableCell>2023-04-23</TableCell>
                          <TableCell>
                            <Badge>Delivered</Badge>
                          </TableCell>
                          <TableCell className="text-right">$149.99</TableCell>
                        </TableRow>
                        {selectedUser.orders > 1 && (
                          <TableRow>
                            <TableCell className="font-medium">ORD-002</TableCell>
                            <TableCell>2023-03-15</TableCell>
                            <TableCell>
                              <Badge>Delivered</Badge>
                            </TableCell>
                            <TableCell className="text-right">$89.99</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No orders found for this user</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="settings" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage user account settings and permissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Role</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={selectedUser.role === "Admin" ? "default" : "outline"}>
                            {selectedUser.role}
                          </Badge>
                          {selectedUser.role !== "Admin" && (
                            <Button variant="outline" size="sm">
                              <ShieldAlert className="mr-2 h-4 w-4" />
                              Make Admin
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Account Status</div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              selectedUser.status === "Active"
                                ? "default"
                                : selectedUser.status === "Inactive"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {selectedUser.status}
                          </Badge>
                          {selectedUser.status === "Blocked" ? (
                            <Button size="sm">
                              <UserCheck className="mr-2 h-4 w-4" />
                              Unblock User
                            </Button>
                          ) : (
                            <Button variant="destructive" size="sm">
                              <UserX className="mr-2 h-4 w-4" />
                              Block User
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Danger Zone</div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
