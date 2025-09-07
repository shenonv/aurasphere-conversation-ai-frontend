import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Smile, Hand, Eye, Users } from "lucide-react"

const bodyLanguageMetrics = [
  {
    category: "Facial Expressions",
    icon: Smile,
    metrics: [
      { name: "Smiles", count: 23, percentage: 68, sentiment: "positive" },
      { name: "Frowns", count: 4, percentage: 12, sentiment: "negative" },
      { name: "Neutral", count: 7, percentage: 20, sentiment: "neutral" },
    ],
  },
  {
    category: "Gestures",
    icon: Hand,
    metrics: [
      { name: "Nodding", count: 45, percentage: 75, sentiment: "positive" },
      { name: "Hand Gestures", count: 32, percentage: 60, sentiment: "positive" },
      { name: "Head Shaking", count: 8, percentage: 15, sentiment: "negative" },
    ],
  },
  {
    category: "Eye Contact",
    icon: Eye,
    metrics: [
      { name: "Looking at Camera", count: 156, percentage: 92, sentiment: "positive" },
      { name: "Looking Away", count: 14, percentage: 8, sentiment: "neutral" },
      { name: "Eye Contact Duration", count: 0, percentage: 85, sentiment: "positive" },
    ],
  },
]

const emotionalStates = [
  { emotion: "Engaged", percentage: 78, color: "bg-chart-2", count: 234 },
  { emotion: "Interested", percentage: 65, color: "bg-chart-1", count: 195 },
  { emotion: "Confused", percentage: 12, color: "bg-chart-5", count: 36 },
  { emotion: "Bored", percentage: 8, color: "bg-chart-4", count: 24 },
  { emotion: "Excited", percentage: 23, color: "bg-chart-3", count: 69 },
]

export function BodyLanguageAnalysis() {
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
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-chart-1" />
          Body Language Analysis
        </CardTitle>
        <CardDescription>Computer vision analysis of non-verbal communication cues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Body Language Metrics */}
        <div className="space-y-4">
          {bodyLanguageMetrics.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.category} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-chart-1" />
                  <h4 className="font-medium text-sm">{category.category}</h4>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-6">
                  {category.metrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.name}</span>
                        <Badge variant={getSentimentColor(metric.sentiment) as any} className="text-xs">
                          {metric.count}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <Progress value={metric.percentage} className="h-2" />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{metric.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Emotional States */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center">
            <Smile className="h-4 w-4 mr-2 text-chart-2" />
            Emotional States Detected
          </h4>
          <div className="space-y-2">
            {emotionalStates.map((state) => (
              <div key={state.emotion} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${state.color}`} />
                  <span className="text-sm">{state.emotion}</span>
                  <Badge variant="outline" className="text-xs">
                    {state.count} instances
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16">
                    <Progress value={state.percentage} className="h-2" />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{state.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Key Insights</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• High engagement levels maintained throughout the presentation</li>
            <li>• Strong eye contact indicates active listening</li>
            <li>• Frequent nodding suggests agreement and understanding</li>
            <li>• Low confusion signals indicate clear communication</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
