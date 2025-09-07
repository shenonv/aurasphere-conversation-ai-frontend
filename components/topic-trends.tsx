"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { topic: "Pricing", thisWeek: 32, lastWeek: 28, growth: 14.3 },
  { topic: "Support", thisWeek: 28, lastWeek: 30, growth: -6.7 },
  { topic: "Features", thisWeek: 25, lastWeek: 18, growth: 38.9 },
  { topic: "Billing", thisWeek: 15, lastWeek: 16, growth: -6.3 },
  { topic: "Account", thisWeek: 12, lastWeek: 14, growth: -14.3 },
  { topic: "Integration", thisWeek: 8, lastWeek: 5, growth: 60.0 },
]

export function TopicTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Trends</CardTitle>
        <CardDescription>Compare topic frequency between this week and last week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="topic" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => [
                `${value} mentions`,
                name === "thisWeek" ? "This Week" : "Last Week",
              ]}
            />
            <Bar dataKey="lastWeek" fill="hsl(var(--chart-5))" name="lastWeek" radius={[2, 2, 0, 0]} />
            <Bar dataKey="thisWeek" fill="hsl(var(--chart-1))" name="thisWeek" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
