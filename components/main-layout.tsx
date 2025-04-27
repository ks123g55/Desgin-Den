"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar()

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen && !isMobile ? "md:ml-64" : "")}>
        <div className="container mx-auto px-4 md:px-6">{children}</div>
      </main>
    </div>
  )
}
