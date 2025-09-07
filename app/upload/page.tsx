import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FileUpload } from "@/components/file-upload"
import { UploadHistory } from "@/components/upload-history"

export default function UploadPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Upload Audio & Video</h1>
              <p className="text-muted-foreground">
                Upload your recordings for AI-powered analysis. Supported formats: MP3, WAV, MP4, MOV, AVI
              </p>
            </div>

            <FileUpload />
            <UploadHistory />
          </div>
        </main>
      </div>
    </div>
  )
}
