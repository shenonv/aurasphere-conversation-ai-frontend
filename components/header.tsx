"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"
import { usePathname } from "next/navigation"

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Audio & Video",
  "/speech": "Speech Recognition",
  "/sentiment": "Sentiment Analysis",
  "/topics": "Topic Classification",
  "/video": "Video Analysis",
  "/analytics": "Analytics & Insights",
  "/settings": "Settings",
}

export function Header() {
  const pathname = usePathname()
  const currentPageName = pageNames[pathname] || "Dashboard"

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">{currentPageName}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
