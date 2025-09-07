import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, TrendingUp, Hash, Target } from "lucide-react"

const topicStats = [
  {
    label: "Total Topics",
    value: "24",
    change: "+3",
    description: "Identified this month",
    icon: Hash,
    color: "text-chart-1",
  },
  {
    label: "Most Discussed",
    value: "Pricing",
    change: "32%",
    description: "Of all conversations",
    icon: MessageSquare,
    color: "text-chart-2",
  },
  {
    label: "Trending Topic",
    value: "Feature Requests",
    change: "+45%",
    description: "Growth this week",
    icon: TrendingUp,
    color: "text-chart-3",
  },
  {
    label: "Resolution Rate",
    value: "87%",
    change: "+5%",
    description: "Topics resolved",
    icon: Target,
    color: "text-chart-2",
  },
]

export function TopicOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {topicStats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
