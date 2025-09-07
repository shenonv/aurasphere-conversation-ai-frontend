import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const keywords = [
  { word: "pricing", frequency: 45, sentiment: "neutral" },
  { word: "support", frequency: 38, sentiment: "positive" },
  { word: "feature", frequency: 32, sentiment: "positive" },
  { word: "bug", frequency: 28, sentiment: "negative" },
  { word: "billing", frequency: 25, sentiment: "neutral" },
  { word: "account", frequency: 22, sentiment: "neutral" },
  { word: "login", frequency: 20, sentiment: "negative" },
  { word: "dashboard", frequency: 18, sentiment: "positive" },
  { word: "integration", frequency: 16, sentiment: "positive" },
  { word: "performance", frequency: 14, sentiment: "negative" },
  { word: "upgrade", frequency: 12, sentiment: "positive" },
  { word: "refund", frequency: 10, sentiment: "negative" },
]

export function KeywordCloud() {
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

  const getFontSize = (frequency: number) => {
    const maxFreq = Math.max(...keywords.map((k) => k.frequency))
    const minSize = 12
    const maxSize = 24
    return minSize + (frequency / maxFreq) * (maxSize - minSize)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Analysis</CardTitle>
        <CardDescription>Most frequently mentioned words and phrases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 items-center justify-center p-4">
          {keywords.map((keyword) => (
            <div key={keyword.word} className="flex flex-col items-center space-y-1">
              <span className="font-medium text-foreground" style={{ fontSize: `${getFontSize(keyword.frequency)}px` }}>
                {keyword.word}
              </span>
              <div className="flex items-center space-x-1">
                <Badge variant={getSentimentColor(keyword.sentiment) as any} className="text-xs">
                  {keyword.frequency}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Positive</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-destructive rounded-full" />
              <span>Negative</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Neutral</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
