import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Trash2, BarChart3, Mic, Video } from "lucide-react"

const mockHistory = [
  {
    id: "1",
    name: "customer-call-2024-01-15.mp3",
    type: "audio" as const,
    uploadDate: "2024-01-15",
    duration: "12:34",
    status: "analyzed" as const,
    sentiment: "positive",
    topics: ["pricing", "support"],
  },
  {
    id: "2",
    name: "sales-meeting-demo.mp4",
    type: "video" as const,
    uploadDate: "2024-01-14",
    duration: "45:12",
    status: "analyzed" as const,
    sentiment: "neutral",
    topics: ["product demo", "objections"],
  },
  {
    id: "3",
    name: "user-feedback-session.wav",
    type: "audio" as const,
    uploadDate: "2024-01-13",
    duration: "8:45",
    status: "processing" as const,
    sentiment: null,
    topics: [],
  },
]

export function UploadHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
        <CardDescription>View and manage your previously uploaded files</CardDescription>
      </CardHeader>
      <CardContent>
        {mockHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No uploads yet. Upload your first file to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {item.type === "video" ? (
                      <Video className="h-8 w-8 text-chart-3" />
                    ) : (
                      <Mic className="h-8 w-8 text-chart-2" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">{item.uploadDate}</span>
                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                      <Badge variant={item.type === "video" ? "secondary" : "outline"}>{item.type}</Badge>
                      {item.status === "analyzed" && item.sentiment && (
                        <Badge
                          variant={
                            item.sentiment === "positive"
                              ? "default"
                              : item.sentiment === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {item.sentiment}
                        </Badge>
                      )}
                      {item.status === "processing" && <Badge variant="outline">Processing...</Badge>}
                    </div>
                    {item.topics.length > 0 && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-muted-foreground">Topics:</span>
                        {item.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {item.status === "analyzed" && (
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Analysis
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
