import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Upload, BarChart3, MessageSquare, Brain } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h2 className="text-3xl font-bold text-card-foreground mb-2">Welcome to AuraSphere</h2>
        <p className="text-muted-foreground mb-4">
          AI-powered platform that analyzes audio and video from customer service calls, sales meetings, and user
          feedback sessions to generate actionable insights.
        </p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Your First Recording
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recordings</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-muted-foreground">+0%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0m</div>
            <p className="text-xs text-muted-foreground">Average processing time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground">Overall customer sentiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Topics</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Topics identified</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              AI Analysis Features
            </CardTitle>
            <CardDescription>Powerful AI capabilities for comprehensive audio and video analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Speech Recognition (ASR)</span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sentiment Analysis</span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Topic Classification</span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Audio Classification</span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
              Getting Started
            </CardTitle>
            <CardDescription>Follow these steps to start analyzing your recordings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="text-sm">Upload audio or video files</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-sm text-muted-foreground">AI processes and transcribes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-sm text-muted-foreground">Review insights and analytics</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
