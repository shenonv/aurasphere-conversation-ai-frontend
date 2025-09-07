"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Upload, Brain, MessageSquare, Settings, Home, Mic, Video } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Upload Audio/Video", href: "/upload", icon: Upload },
  { name: "Speech Recognition", href: "/speech", icon: Mic },
  { name: "Sentiment Analysis", href: "/sentiment", icon: Brain },
  { name: "Topic Classification", href: "/topics", icon: MessageSquare },
  { name: "Video Analysis", href: "/video", icon: Video },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">AuraSphere</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const current = pathname === item.href
            return (
              <Button
                key={item.name}
                variant={current ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  current
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">AI-Powered Analysis Platform</p>
        </div>
      </div>
    </div>
  )
}
