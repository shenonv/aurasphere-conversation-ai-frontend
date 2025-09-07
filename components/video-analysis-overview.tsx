import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, Activity, Clock, Smile, TrendingUp } from "lucide-react"

const videoMetrics = [
  {
    label: "Engagement Score",
    value: "87%",
    change: "+12%",
    trend: "up" as const,
    icon: Activity,
    description: "Overall visual engagement",
    color: "text-chart-2",
  },
  {
    label: "Attention Rate",
    value: "92%",
    change: "+5%",
    trend: "up" as const,
    icon: Eye,
    description: "Looking at camera/screen",
    color: "text-chart-1",
  },
  {
    label: "Active Speakers",
    value: "3",
    change: "0",
    trend: "stable" as const,
    icon: Users,
    description: "Participants detected",
    color: "text-chart-3",
  },
  {
    label: "Avg Speaking Time",
    value: "4:32",
    change: "-8%",
    trend: "down" as const,
    icon: Clock,
    description: "Per participant",
    color: "text-chart-5",
  },
  {
    label: "Positive Expressions",
    value: "74%",
    change: "+18%",
    trend: "up" as const,
    icon: Smile,
    description: "Smiles and nods detected",
    color: "text-chart-2",
  },
  {
    label: "Energy Level",
    value: "High",
    change: "+23%",
    trend: "up" as const,
    icon: TrendingUp,
    description: "Movement and gestures",
    color: "text-chart-1",
  },
]

export function VideoAnalysisOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videoMetrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up" || (metric.trend === "down" && metric.label.includes("Speaking Time"))

        return (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={isPositive ? "default" : "secondary"} className="text-xs">
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
