"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShoppingBag,
  Scissors,
  ShoppingCart,
  User,
  ClipboardList,
  MessageSquare,
  Menu,
  X,
  LogIn,
  Settings,
  Users,
  Bell,
  FileText,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This is a mock - in a real app, this would come from your auth system
const mockUser = {
  isLoggedIn: false,
  isAdmin: false,
  name: "Guest User",
  email: "guest@example.com",
  avatar: "/placeholder.svg",
}

export function Sidebar() {
  const { isOpen, toggleSidebar, isMobile } = useSidebar()
  const pathname = usePathname()
  const [user, setUser] = useState(mockUser)

  // For demo purposes - toggle between user and admin
  const toggleAdmin = () => {
    setUser({
      ...user,
      isLoggedIn: true,
      isAdmin: !user.isAdmin,
      name: user.isAdmin ? "John Doe" : "Admin User",
      email: user.isAdmin ? "john@example.com" : "admin@designden.com",
    })
  }

  // For demo purposes - toggle login state
  const toggleLogin = () => {
    setUser({
      ...user,
      isLoggedIn: !user.isLoggedIn,
      name: user.isLoggedIn ? "Guest User" : "John Doe",
      email: user.isLoggedIn ? "guest@example.com" : "john@example.com",
    })
  }

  const customerLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/customize", label: "Customize", icon: Scissors },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/orders", label: "My Orders", icon: ClipboardList },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/support", label: "Support", icon: MessageSquare },
  ]

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/products", label: "Products", icon: ShoppingBag },
    { href: "/admin/orders", label: "Orders", icon: ClipboardList },
    { href: "/admin/customizations", label: "Customizations", icon: Scissors },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/announcements", label: "Announcements", icon: Bell },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const links = user.isAdmin ? adminLinks : customerLinks

  if (isMobile && !isOpen) {
    return (
      <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out",
        isMobile && !isOpen && "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Scissors className="h-6 w-6" />
            <span className="font-bold text-xl">Design Den</span>
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="border-t p-4">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto w-full flex items-center gap-2 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleAdmin}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Switch to {user.isAdmin ? "Customer" : "Admin"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleLogin}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
              <Button size="sm" onClick={toggleLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
