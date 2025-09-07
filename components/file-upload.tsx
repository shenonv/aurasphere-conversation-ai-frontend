"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, type File, X, CheckCircle, AlertCircle, Mic, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  file: File
  id: string
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
  type: "audio" | "video"
}

export function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "uploading",
      type: file.type.startsWith("video/") ? "video" : "audio",
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id)
    })
  }, [])

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + 10 }
            } else if (file.status === "uploading") {
              return { ...file, status: "processing" }
            } else if (file.status === "processing") {
              return { ...file, status: "completed" }
            }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 6000)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".aac"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    maxSize: 500 * 1024 * 1024, // 500MB
  })

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Drag and drop your audio or video files here, or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium text-primary">Drop the files here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop files here or click to upload</p>
                <p className="text-sm text-muted-foreground">Supports MP3, WAV, MP4, MOV, AVI (max 500MB per file)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track the progress of your file uploads and processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {uploadFile.type === "video" ? (
                    <Video className="h-8 w-8 text-chart-3" />
                  ) : (
                    <Mic className="h-8 w-8 text-chart-2" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={uploadFile.type === "video" ? "secondary" : "outline"}>{uploadFile.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {uploadFile.status === "uploading" && (
                      <>
                        <Progress value={uploadFile.progress} className="flex-1" />
                        <span className="text-xs text-muted-foreground">{uploadFile.progress}%</span>
                      </>
                    )}

                    {uploadFile.status === "processing" && (
                      <>
                        <div className="flex-1 bg-secondary/20 rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full animate-pulse" style={{ width: "60%" }} />
                        </div>
                        <span className="text-xs text-muted-foreground">Processing...</span>
                      </>
                    )}

                    {uploadFile.status === "completed" && (
                      <div className="flex items-center space-x-2 text-chart-2">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Ready for analysis</span>
                      </div>
                    )}

                    {uploadFile.status === "error" && (
                      <div className="flex items-center space-x-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Upload failed</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
