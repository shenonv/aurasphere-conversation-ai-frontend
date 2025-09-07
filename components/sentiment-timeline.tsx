"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const timelineData = [
  { date: "Jan 1", positive: 0.65, negative: 0.2, neutral: 0.15 },
  { date: "Jan 8", positive: 0.72, negative: 0.18, neutral: 0.1 },
  { date: "Jan 15", positive: 0.68, negative: 0.22, neutral: 0.1 },
  { date: "Jan 22", positive: 0.75, negative: 0.15, neutral: 0.1 },
  { date: "Jan 29", positive: 0.78, negative: 0.12, neutral: 0.1 },
  { date: "Feb 5", positive: 0.72, negative: 0.16, neutral: 0.12 },
  { date: "Feb 12", positive: 0.8, negative: 0.1, neutral: 0.1 },
]

export function SentimentTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Trends</CardTitle>
        <CardDescription>Track sentiment changes over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
            <YAxis
              className="text-xs fill-muted-foreground"
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
            />
            <Line type="monotone" dataKey="positive" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Positive" />
            <Line type="monotone" dataKey="negative" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Negative" />
            <Line type="monotone" dataKey="neutral" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Neutral" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
