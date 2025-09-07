import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, MessageSquare, Target, AlertTriangle, CheckCircle } from "lucide-react"

const overviewMetrics = [
  {
    label: "Total Conversations",
    value: "1,247",
    change: "+12.5%",
    trend: "up" as const,
    icon: MessageSquare,
    description: "Analyzed this month",
  },
  {
    label: "Average Sentiment",
    value: "72%",
    change: "+5.2%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "Positive sentiment score",
  },
  {
    label: "Resolution Rate",
    value: "87%",
    change: "+3.1%",
    trend: "up" as const,
    icon: Target,
    description: "Issues resolved successfully",
  },
  {
    label: "Avg Response Time",
    value: "2.4m",
    change: "-15.3%",
    trend: "down" as const,
    icon: Clock,
    description: "Faster response times",
  },
  {
    label: "Customer Satisfaction",
    value: "4.6/5",
    change: "+0.3",
    trend: "up" as const,
    icon: CheckCircle,
    description: "Based on sentiment analysis",
  },
  {
    label: "Escalation Rate",
    value: "8.2%",
    change: "-2.1%",
    trend: "down" as const,
    icon: AlertTriangle,
    description: "Conversations escalated",
  },
]

export function InsightsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {overviewMetrics.map((metric) => {
        const Icon = metric.icon
        const isPositiveTrend =
          (metric.trend === "up" && !metric.label.includes("Escalation")) ||
          (metric.trend === "down" && metric.label.includes("Escalation")) ||
          (metric.trend === "down" && metric.label.includes("Response Time"))

        return (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={isPositiveTrend ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
