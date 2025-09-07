import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoAnalysisOverview } from "@/components/video-analysis-overview"
import { VideoPlayer } from "@/components/video-player"
import { EngagementMetrics } from "@/components/engagement-metrics"
import { BodyLanguageAnalysis } from "@/components/body-language-analysis"
import { VisualAttentionMap } from "@/components/visual-attention-map"

export default function VideoPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Video Analysis</h1>
              <p className="text-muted-foreground">
                Advanced computer vision analysis of video calls including engagement, body language, and visual cues.
              </p>
            </div>

            <VideoAnalysisOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VideoPlayer />
              <EngagementMetrics />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BodyLanguageAnalysis />
              <VisualAttentionMap />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
