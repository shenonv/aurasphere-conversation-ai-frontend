import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Heart, Frown, Smile } from "lucide-react"

const sentimentStats = [
  {
    label: "Overall Sentiment",
    value: "Positive",
    score: 0.72,
    change: "+5.2%",
    trend: "up" as const,
    icon: Smile,
    color: "text-chart-2",
  },
  {
    label: "Customer Satisfaction",
    value: "High",
    score: 0.84,
    change: "+2.1%",
    trend: "up" as const,
    icon: Heart,
    color: "text-chart-2",
  },
  {
    label: "Negative Feedback",
    value: "Low",
    score: 0.16,
    change: "-3.4%",
    trend: "down" as const,
    icon: Frown,
    color: "text-chart-4",
  },
  {
    label: "Neutral Interactions",
    value: "Stable",
    score: 0.28,
    change: "0.0%",
    trend: "stable" as const,
    icon: Minus,
    color: "text-muted-foreground",
  },
]

export function SentimentOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sentimentStats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : stat.trend === "down" ? TrendingDown : Minus

        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  <TrendIcon
                    className={`h-3 w-3 ${
                      stat.trend === "up"
                        ? "text-chart-2"
                        : stat.trend === "down"
                          ? "text-chart-4"
                          : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-chart-2"
                        : stat.trend === "down"
                          ? "text-chart-4"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      stat.score >= 0.7 ? "bg-chart-2" : stat.score >= 0.4 ? "bg-chart-5" : "bg-chart-4"
                    }`}
                    style={{ width: `${stat.score * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">Score: {(stat.score * 100).toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
