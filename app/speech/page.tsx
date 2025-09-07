import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TranscriptViewer } from "@/components/transcript-viewer"
import { TranscriptList } from "@/components/transcript-list"

export default function SpeechPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Speech Recognition</h1>
              <p className="text-muted-foreground">
                View and manage transcriptions from your audio and video files with AI-powered speech recognition.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <TranscriptList />
              </div>
              <div className="lg:col-span-2">
                <TranscriptViewer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
