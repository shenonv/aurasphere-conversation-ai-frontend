"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, BarChart3, Table } from "lucide-react"

const exportOptions = [
  { id: "transcripts", label: "Transcripts", description: "Full conversation transcripts" },
  { id: "sentiment", label: "Sentiment Analysis", description: "Sentiment scores and trends" },
  { id: "topics", label: "Topic Classification", description: "Identified topics and keywords" },
  { id: "insights", label: "AI Insights", description: "Generated recommendations" },
  { id: "metrics", label: "Performance Metrics", description: "KPIs and analytics data" },
]

export function DataExport() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [format, setFormat] = useState("csv")

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, optionId])
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Analytics Data</DialogTitle>
          <DialogDescription>Select the data you want to export and choose your preferred format.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Data to Export</h4>
            {exportOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                />
                <div className="space-y-1">
                  <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                    {option.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Export Format</h4>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center">
                    <Table className="h-4 w-4 mr-2" />
                    CSV (Spreadsheet)
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    JSON (Data)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    PDF (Report)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button disabled={selectedOptions.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export ({selectedOptions.length} items)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
