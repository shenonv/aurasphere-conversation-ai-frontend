"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Download,
  Search,
  Copy,
  Volume2,
  Settings,
  Highlighter as Highlight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TranscriptSegment {
  id: string
  startTime: number
  endTime: number
  speaker: string
  text: string
  confidence: number
}

const mockTranscript: TranscriptSegment[] = [
  {
    id: "1",
    startTime: 0,
    endTime: 4.2,
    speaker: "Agent",
    text: "Hello, thank you for calling AuraSphere customer support. My name is Sarah, how can I help you today?",
    confidence: 0.96,
  },
  {
    id: "2",
    startTime: 4.8,
    endTime: 9.1,
    speaker: "Customer",
    text: "Hi Sarah, I'm having trouble with my account login. It keeps saying my password is incorrect.",
    confidence: 0.94,
  },
  {
    id: "3",
    startTime: 9.5,
    endTime: 14.3,
    speaker: "Agent",
    text: "I'm sorry to hear you're having trouble logging in. Let me help you with that. Can you please provide me with your email address?",
    confidence: 0.97,
  },
  {
    id: "4",
    startTime: 14.8,
    endTime: 18.2,
    speaker: "Customer",
    text: "Sure, it's john.doe@email.com",
    confidence: 0.92,
  },
  {
    id: "5",
    startTime: 18.6,
    endTime: 23.4,
    speaker: "Agent",
    text: "Thank you. I can see your account here. Let me check the recent login attempts. It looks like there might be a temporary lock on your account.",
    confidence: 0.95,
  },
  {
    id: "6",
    startTime: 24.0,
    endTime: 27.8,
    speaker: "Customer",
    text: "Oh, that explains it. How can we unlock it?",
    confidence: 0.93,
  },
]

export function TranscriptViewer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedSegments, setHighlightedSegments] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const jumpToTime = (time: number) => {
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const filteredTranscript = mockTranscript.filter((segment) =>
    segment.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyTranscript = () => {
    const fullText = mockTranscript
      .map((segment) => `[${formatTime(segment.startTime)}] ${segment.speaker}: ${segment.text}`)
      .join("\n")
    navigator.clipboard.writeText(fullText)
  }

  return (
    <div className="space-y-6">
      {/* Audio Player */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>customer-call-2024-01-15.mp3</CardTitle>
              <CardDescription>Duration: 12:34 • Accuracy: 94% • 1,247 words</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={copyTranscript}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Audio Controls */}
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
                <span className="text-sm text-muted-foreground">{formatTime(currentTime)} / 12:34</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(currentTime / 754) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transcript</CardTitle>
              <CardDescription>Click on any segment to jump to that time in the audio</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredTranscript.map((segment, index) => (
              <div key={segment.id}>
                <div
                  className={cn(
                    "p-4 rounded-lg cursor-pointer transition-colors",
                    Math.abs(currentTime - segment.startTime) < 2
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50",
                    searchQuery && segment.text.toLowerCase().includes(searchQuery.toLowerCase())
                      ? "bg-secondary/20"
                      : "",
                  )}
                  onClick={() => jumpToTime(segment.startTime)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant={segment.speaker === "Agent" ? "default" : "secondary"} className="text-xs">
                        {segment.speaker}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">{formatTime(segment.startTime)}</span>
                      <div className="flex items-center space-x-1">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            segment.confidence >= 0.95
                              ? "bg-chart-2"
                              : segment.confidence >= 0.9
                                ? "bg-chart-5"
                                : "bg-chart-4",
                          )}
                        />
                        <span className="text-xs text-muted-foreground">{Math.round(segment.confidence * 100)}%</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Highlight className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {searchQuery
                      ? segment.text.split(new RegExp(`(${searchQuery})`, "gi")).map((part, i) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <mark key={i} className="bg-secondary text-secondary-foreground">
                              {part}
                            </mark>
                          ) : (
                            part
                          ),
                        )
                      : segment.text}
                  </p>
                </div>
                {index < filteredTranscript.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element for demo */}
      <audio ref={audioRef} className="hidden">
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
