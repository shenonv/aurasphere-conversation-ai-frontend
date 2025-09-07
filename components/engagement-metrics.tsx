"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const engagementData = [
  { time: "0:00", engagement: 0.8, attention: 0.9, energy: 0.6 },
  { time: "5:00", engagement: 0.85, attention: 0.88, energy: 0.7 },
  { time: "10:00", engagement: 0.75, attention: 0.82, energy: 0.65 },
  { time: "15:00", engagement: 0.9, attention: 0.95, energy: 0.8 },
  { time: "20:00", engagement: 0.7, attention: 0.75, energy: 0.6 },
  { time: "25:00", engagement: 0.88, attention: 0.9, energy: 0.75 },
  { time: "30:00", engagement: 0.92, attention: 0.94, energy: 0.85 },
  { time: "35:00", engagement: 0.78, attention: 0.8, energy: 0.7 },
  { time: "40:00", engagement: 0.85, attention: 0.87, energy: 0.75 },
  { time: "45:00", engagement: 0.9, attention: 0.92, energy: 0.8 },
]

const participantEngagement = [
  { name: "John (Presenter)", engagement: 0.92, attention: 0.95, speaking: 0.65 },
  { name: "Sarah (Client)", engagement: 0.87, attention: 0.89, speaking: 0.25 },
  { name: "Mike (Client)", engagement: 0.74, attention: 0.78, speaking: 0.1 },
]

export function EngagementMetrics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Timeline</CardTitle>
          <CardDescription>Track visual engagement, attention, and energy levels over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs fill-muted-foreground" />
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
              <Area
                type="monotone"
                dataKey="engagement"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
                name="Engagement"
              />
              <Area
                type="monotone"
                dataKey="attention"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
                name="Attention"
              />
              <Area
                type="monotone"
                dataKey="energy"
                stackId="3"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.3}
                name="Energy"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Participant Analysis</CardTitle>
          <CardDescription>Individual engagement metrics for each participant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {participantEngagement.map((participant) => (
              <div key={participant.name} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{participant.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {(participant.engagement * 100).toFixed(0)}% engaged
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Engagement</span>
                      <span className="text-xs font-medium">{(participant.engagement * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-chart-1 h-2 rounded-full"
                        style={{ width: `${participant.engagement * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Attention</span>
                      <span className="text-xs font-medium">{(participant.attention * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-chart-2 h-2 rounded-full"
                        style={{ width: `${participant.attention * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Speaking</span>
                      <span className="text-xs font-medium">{(participant.speaking * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-chart-3 h-2 rounded-full"
                        style={{ width: `${participant.speaking * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
