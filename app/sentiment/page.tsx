import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SentimentOverview } from "@/components/sentiment-overview"
import { SentimentTimeline } from "@/components/sentiment-timeline"
import { ConversationSentiment } from "@/components/conversation-sentiment"

export default function SentimentPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Sentiment Analysis</h1>
              <p className="text-muted-foreground">
                Analyze emotional tone and sentiment patterns across your conversations to improve customer experience.
              </p>
            </div>

            <SentimentOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SentimentTimeline />
              <ConversationSentiment />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
