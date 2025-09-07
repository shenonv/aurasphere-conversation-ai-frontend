"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const performanceData = [
  {
    date: "Week 1",
    conversations: 280,
    sentiment: 0.68,
    resolution: 0.82,
    satisfaction: 4.2,
  },
  {
    date: "Week 2",
    conversations: 320,
    sentiment: 0.72,
    resolution: 0.85,
    satisfaction: 4.4,
  },
  {
    date: "Week 3",
    conversations: 295,
    sentiment: 0.69,
    resolution: 0.88,
    satisfaction: 4.3,
  },
  {
    date: "Week 4",
    conversations: 352,
    sentiment: 0.75,
    resolution: 0.87,
    satisfaction: 4.6,
  },
]

const topIssues = [
  { issue: "Login Problems", count: 45, trend: "up", severity: "high" },
  { issue: "Billing Questions", count: 38, trend: "stable", severity: "medium" },
  { issue: "Feature Requests", count: 32, trend: "up", severity: "low" },
  { issue: "Performance Issues", count: 28, trend: "down", severity: "high" },
  { issue: "Account Setup", count: 22, trend: "stable", severity: "medium" },
]

export function PerformanceMetrics() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Track key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                <YAxis yAxisId="left" className="text-xs fill-muted-foreground" />
                <YAxis yAxisId="right" orientation="right" className="text-xs fill-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="conversations" fill="hsl(var(--chart-1))" name="Conversations" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sentiment"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Sentiment"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="resolution"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  name="Resolution Rate"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Issues</CardTitle>
          <CardDescription>Most frequently reported problems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topIssues.map((issue, index) => (
              <div key={issue.issue} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span className="text-sm">{issue.issue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getSeverityColor(issue.severity) as any} className="text-xs">
                      {issue.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{issue.count} reports</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={issue.trend === "up" ? "destructive" : issue.trend === "down" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {issue.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
