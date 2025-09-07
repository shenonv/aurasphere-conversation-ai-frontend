import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TopicOverview } from "@/components/topic-overview"
import { TopicDistribution } from "@/components/topic-distribution"
import { KeywordCloud } from "@/components/keyword-cloud"
import { TopicTrends } from "@/components/topic-trends"

export default function TopicsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Topic Classification</h1>
              <p className="text-muted-foreground">
                Discover key themes and topics discussed in your conversations with AI-powered classification.
              </p>
            </div>

            <TopicOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TopicDistribution />
              <KeywordCloud />
            </div>

            <TopicTrends />
          </div>
        </main>
      </div>
    </div>
  )
}
