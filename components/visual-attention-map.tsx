"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Target, Clock, BarChart3 } from "lucide-react"

const attentionZones = [
  { zone: "Presenter Face", percentage: 45, duration: "20:34", color: "bg-chart-1" },
  { zone: "Screen/Slides", percentage: 32, duration: "14:28", color: "bg-chart-2" },
  { zone: "Other Participants", percentage: 15, duration: "6:47", color: "bg-chart-3" },
  { zone: "Off-Screen", percentage: 8, duration: "3:23", color: "bg-chart-4" },
]

const gazePatterns = [
  { pattern: "Focused Attention", score: 87, description: "Sustained focus on key areas" },
  { pattern: "Active Scanning", score: 72, description: "Healthy movement between zones" },
  { pattern: "Distraction Level", score: 13, description: "Minimal off-screen looking" },
  { pattern: "Engagement Depth", score: 91, description: "Deep visual engagement" },
]

export function VisualAttentionMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="h-5 w-5 mr-2 text-chart-2" />
          Visual Attention Analysis
        </CardTitle>
        <CardDescription>Eye tracking and gaze pattern analysis for engagement insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Attention Heatmap Visualization */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Attention Heatmap</h4>
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 h-48">
            {/* Simulated heatmap overlay */}
            <div className="absolute inset-4 bg-gradient-to-br from-chart-1/30 via-chart-2/20 to-transparent rounded" />
            <div className="absolute top-8 left-8 w-16 h-12 bg-chart-1/60 rounded-lg" />
            <div className="absolute top-8 right-8 w-20 h-16 bg-chart-2/40 rounded-lg" />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-chart-3/30 rounded-lg" />

            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full" />
                <span>High</span>
                <div className="w-2 h-2 bg-chart-2 rounded-full" />
                <span>Medium</span>
                <div className="w-2 h-2 bg-chart-3 rounded-full" />
                <span>Low</span>
              </div>
            </div>

            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Gaze Tracking Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Attention Zones */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Attention Distribution</h4>
          <div className="space-y-2">
            {attentionZones.map((zone) => (
              <div key={zone.zone} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${zone.color}`} />
                  <span className="text-sm font-medium">{zone.zone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{zone.duration}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {zone.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaze Pattern Analysis */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Gaze Pattern Scores</h4>
          <div className="grid grid-cols-2 gap-3">
            {gazePatterns.map((pattern) => (
              <div key={pattern.pattern} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pattern.pattern}</span>
                  <Badge
                    variant={pattern.score >= 80 ? "default" : pattern.score >= 60 ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {pattern.score}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{pattern.description}</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      pattern.score >= 80 ? "bg-chart-2" : pattern.score >= 60 ? "bg-chart-5" : "bg-chart-4"
                    }`}
                    style={{ width: `${pattern.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed Report
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Export Heatmap
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
