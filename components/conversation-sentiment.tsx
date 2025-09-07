import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smile, Frown, Meh, Play, BarChart3 } from "lucide-react"

const conversations = [
  {
    id: "1",
    name: "customer-call-2024-01-15.mp3",
    sentiment: "positive" as const,
    score: 0.84,
    duration: "12:34",
    keyEmotions: ["satisfaction", "gratitude"],
    summary: "Customer expressed satisfaction with product resolution",
  },
  {
    id: "2",
    name: "sales-meeting-demo.mp4",
    sentiment: "neutral" as const,
    score: 0.52,
    duration: "45:12",
    keyEmotions: ["interest", "concern"],
    summary: "Mixed reactions to product demo, some concerns raised",
  },
  {
    id: "3",
    name: "user-feedback-session.wav",
    sentiment: "negative" as const,
    score: 0.28,
    duration: "8:45",
    keyEmotions: ["frustration", "disappointment"],
    summary: "User reported multiple issues with current features",
  },
  {
    id: "4",
    name: "team-standup-meeting.mp4",
    sentiment: "positive" as const,
    score: 0.76,
    duration: "23:18",
    keyEmotions: ["enthusiasm", "collaboration"],
    summary: "Team showed positive energy and collaborative spirit",
  },
]

export function ConversationSentiment() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-4 w-4 text-chart-2" />
      case "negative":
        return <Frown className="h-4 w-4 text-chart-4" />
      default:
        return <Meh className="h-4 w-4 text-chart-5" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "default"
      case "negative":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Analysis</CardTitle>
        <CardDescription>Detailed sentiment breakdown by conversation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(conversation.sentiment)}
                  <span className="font-medium text-sm truncate">{conversation.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getSentimentColor(conversation.sentiment) as any}>{conversation.sentiment}</Badge>
                  <span className="text-xs text-muted-foreground">{conversation.duration}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Sentiment Score</span>
                  <span className="text-xs font-medium">{(conversation.score * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      conversation.score >= 0.7 ? "bg-chart-2" : conversation.score >= 0.4 ? "bg-chart-5" : "bg-chart-4"
                    }`}
                    style={{ width: `${conversation.score * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Key Emotions:</span>
                  {conversation.keyEmotions.map((emotion) => (
                    <Badge key={emotion} variant="outline" className="text-xs">
                      {emotion}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{conversation.summary}</p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  <Play className="h-3 w-3 mr-1" />
                  Listen
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
