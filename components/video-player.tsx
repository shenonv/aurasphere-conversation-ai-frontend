"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Eye, Users } from "lucide-react"

const videoEvents = [
  { time: 15, type: "engagement", description: "High engagement detected" },
  { time: 32, type: "speaker", description: "New speaker identified" },
  { time: 48, type: "attention", description: "Attention drop detected" },
  { time: 67, type: "positive", description: "Positive expressions" },
  { time: 89, type: "gesture", description: "Active gesturing" },
]

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const jumpToEvent = (time: number) => {
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "engagement":
        return <Eye className="h-3 w-3" />
      case "speaker":
        return <Users className="h-3 w-3" />
      default:
        return <Eye className="h-3 w-3" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "engagement":
        return "default"
      case "speaker":
        return "secondary"
      case "attention":
        return "destructive"
      case "positive":
        return "default"
      case "gesture":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Analysis Player</CardTitle>
        <CardDescription>sales-meeting-demo.mp4 • 45:12 duration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm opacity-75">Video Player Placeholder</p>
              <p className="text-xs opacity-50">Click play to start analysis</p>
            </div>
          </div>

          {/* Video Overlay - Analysis Indicators */}
          <div className="absolute top-4 left-4 space-y-2">
            <Badge variant="default" className="bg-black/50 text-white">
              <Eye className="h-3 w-3 mr-1" />3 faces detected
            </Badge>
            <Badge variant="secondary" className="bg-black/50 text-white">
              <Users className="h-3 w-3 mr-1" />
              Speaker: John
            </Badge>
          </div>

          {/* Engagement Heatmap Overlay */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-black/50 rounded p-2 text-white text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-chart-2 rounded-full" />
                <span>High Engagement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlayPause} size="sm">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <SkipForward className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 ml-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{formatTime(currentTime)} / 45:12</span>
            </div>
            <Button variant="outline" size="sm" className="ml-auto bg-transparent">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar with Events */}
          <div className="relative">
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(currentTime / 2712) * 100}%` }}
              />
            </div>
            {/* Event Markers */}
            {videoEvents.map((event) => (
              <div
                key={event.time}
                className="absolute top-0 w-1 h-2 bg-chart-3 rounded cursor-pointer"
                style={{ left: `${(event.time / 2712) * 100}%` }}
                onClick={() => jumpToEvent(event.time)}
                title={event.description}
              />
            ))}
          </div>
        </div>

        {/* Event Timeline */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Events</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {videoEvents.map((event) => (
              <div
                key={event.time}
                className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-muted/50"
                onClick={() => jumpToEvent(event.time)}
              >
                <div className="flex items-center space-x-2">
                  <Badge variant={getEventColor(event.type) as any} className="text-xs">
                    {getEventIcon(event.type)}
                  </Badge>
                  <span className="text-sm">{event.description}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{formatTime(event.time)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
