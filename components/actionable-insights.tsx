import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertTriangle, Target, ArrowRight, CheckCircle } from "lucide-react"

const insights = [
  {
    id: "1",
    type: "opportunity",
    priority: "high",
    title: "Improve Login Experience",
    description:
      "45% of negative sentiment conversations mention login issues. Consider implementing SSO or password reset improvements.",
    impact: "Could reduce support tickets by 30%",
    action: "Review authentication flow",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "warning",
    priority: "medium",
    title: "Feature Request Trend",
    description:
      "Integration requests increased 60% this week. This indicates strong product-market fit but missing functionality.",
    impact: "Potential revenue opportunity",
    action: "Prioritize integration roadmap",
    icon: AlertTriangle,
  },
  {
    id: "3",
    type: "success",
    priority: "low",
    title: "Response Time Improvement",
    description:
      "Average response time decreased by 15.3%. Customer satisfaction scores are trending upward as a result.",
    impact: "Positive customer experience",
    action: "Document best practices",
    icon: CheckCircle,
  },
  {
    id: "4",
    type: "opportunity",
    priority: "high",
    title: "Proactive Support Opportunity",
    description:
      "Performance issues cluster around specific features. Proactive monitoring could prevent 70% of these complaints.",
    impact: "Reduce escalations significantly",
    action: "Implement monitoring alerts",
    icon: Target,
  },
]

export function ActionableInsights() {
  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "default"
      case "warning":
        return "secondary"
      case "success":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return TrendingUp
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      default:
        return Lightbulb
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-chart-5" />
          Actionable Insights
        </CardTitle>
        <CardDescription>AI-generated recommendations based on your conversation analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight) => {
            const Icon = getIcon(insight.type)

            return (
              <div key={insight.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-chart-1" />
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(insight.priority) as any} className="text-xs">
                      {insight.priority}
                    </Badge>
                    <Badge variant={getInsightColor(insight.type) as any} className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-chart-2">Impact:</span>
                    <span className="text-xs text-muted-foreground">{insight.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">Recommended Action:</span>
                      <span className="text-xs text-muted-foreground">{insight.action}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Take Action
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
