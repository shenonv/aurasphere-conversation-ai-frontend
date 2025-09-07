import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { InsightsOverview } from "@/components/insights-overview"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { ActionableInsights } from "@/components/actionable-insights"
import { DataExport } from "@/components/data-export"
import { InsightsFilters } from "@/components/insights-filters"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Insights</h1>
                <p className="text-muted-foreground">
                  Comprehensive analysis and actionable insights from your conversation data.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <InsightsFilters />
                <DataExport />
              </div>
            </div>

            <InsightsOverview />
            <PerformanceMetrics />
            <ActionableInsights />
          </div>
        </main>
      </div>
    </div>
  )
}
