"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const topicData = [
  { name: "Pricing", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Technical Support", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Feature Requests", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Billing", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Account Issues", value: 10, color: "hsl(var(--chart-5))" },
]

export function TopicDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Distribution</CardTitle>
        <CardDescription>Breakdown of conversation topics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={topicData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
              {topicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Percentage"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
