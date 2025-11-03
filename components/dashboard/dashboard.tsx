"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, BarChart3, Calendar } from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { useRouter } from "next/navigation"

export function Dashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)
  const [reports, setReports] = useState<any[]>([])
  const [vitals, setVitals] = useState<any[]>([])
  const router = useRouter()
  // Load data from localStorage

  const user = JSON.parse(localStorage.getItem("user")!)
  const onLogout = () => {
    console.log("logout user")
    
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={onLogout} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Quick Action Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowUploadModal(true)}>
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FileUp className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Upload Report</h3>
              <p className="text-xs text-muted-foreground">Add medical reports or prescriptions</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowVitalsModal(true)}>
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Add Vitals</h3>
              <p className="text-xs text-muted-foreground">Track BP, sugar, weight, etc.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Timeline</h3>
              <p className="text-xs text-muted-foreground">{reports.length + vitals.length} items</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            {/* <TimelineView reports={reports} vitals={vitals} /> */}
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {/* <ReportsList reports={reports} /> */}
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <VitalsList vitals={vitals} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      {/* {showUploadModal && (
        // <UploadReportModal onClose={() => setShowUploadModal(false)} onReportUploaded={handleReportUploaded} />
      )} */}
      {/* {showVitalsModal && <AddVitalsModal onClose={() => setShowVitalsModal(false)} onVitalAdded={handleVitalAdded} />} */}
    </div>
  )
}

function VitalsList({ vitals }: { vitals: any[] }) {
  if (vitals.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No vitals recorded yet. Add your first vitals!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {vitals.map((vital, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-lg">{vital.date}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {vital.systolic && (
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="font-semibold">
                    {vital.systolic}/{vital.diastolic} mmHg
                  </p>
                </div>
              )}
              {vital.bloodSugar && (
                <div>
                  <p className="text-sm text-muted-foreground">Blood Sugar</p>
                  <p className="font-semibold">{vital.bloodSugar} mg/dL</p>
                </div>
              )}
              {vital.weight && (
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold">{vital.weight} kg</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
