"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Mic, Video, Clock, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const mockTranscripts = [
  {
    id: "1",
    name: "customer-call-2024-01-15.mp3",
    type: "audio" as const,
    date: "2024-01-15",
    duration: "12:34",
    status: "completed" as const,
    accuracy: 94,
    wordCount: 1247,
  },
  {
    id: "2",
    name: "sales-meeting-demo.mp4",
    type: "video" as const,
    date: "2024-01-14",
    duration: "45:12",
    status: "completed" as const,
    accuracy: 91,
    wordCount: 4521,
  },
  {
    id: "3",
    name: "user-feedback-session.wav",
    type: "audio" as const,
    date: "2024-01-13",
    duration: "8:45",
    status: "processing" as const,
    accuracy: null,
    wordCount: null,
  },
  {
    id: "4",
    name: "team-standup-meeting.mp4",
    type: "video" as const,
    date: "2024-01-12",
    duration: "23:18",
    status: "completed" as const,
    accuracy: 96,
    wordCount: 2134,
  },
]

export function TranscriptList() {
  const [selectedId, setSelectedId] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTranscripts = mockTranscripts.filter((transcript) =>
    transcript.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Transcripts</CardTitle>
        <CardDescription>Select a file to view its transcription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search transcripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Transcript List */}
        <div className="space-y-2">
          {filteredTranscripts.map((transcript) => (
            <div
              key={transcript.id}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-colors",
                selectedId === transcript.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
              onClick={() => setSelectedId(transcript.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {transcript.type === "video" ? (
                    <Video className="h-4 w-4 text-chart-3 flex-shrink-0" />
                  ) : (
                    <Mic className="h-4 w-4 text-chart-2 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium truncate">{transcript.name}</span>
                </div>
                <Badge
                  variant={transcript.status === "completed" ? "default" : "secondary"}
                  className="text-xs flex-shrink-0"
                >
                  {transcript.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {transcript.duration}
                  </span>
                  <span>{transcript.date}</span>
                </div>

                {transcript.status === "completed" && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {transcript.wordCount} words
                    </span>
                    <span className="text-chart-2 font-medium">{transcript.accuracy}% accuracy</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
