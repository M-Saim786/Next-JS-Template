// app/dashboard/page.tsx
"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, BarChart3, Calendar } from "lucide-react"
import { toast } from "sonner"
import { useGetDashboardData } from "@/lib/api/dashboard"
// import { DashboardLayout } from "@/components/dashboard/dashboard-layout" // Import new layout
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import  DashboardLayout from "./layout"

export default function DashboardHomePage() {
  const router = useRouter()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showVitalsModal, setShowVitalsModal] = useState(false)

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const { data: dashboardData, isLoading, isError } = useGetDashboardData()

  const data = (dashboardData as any) || {}
  const files = data.files || []
  const vitals = data.vitals || []

  const handleReportUploaded = () => {
    router.push("/dashboard/reports")
    // toast.success("Report uploaded successfully")
    // Consider invalidating queries here if you want immediate refresh
  }

  const handleVitalAdded = () => {
    setTimeout(() => {
    
        router.push("/dashboard/vitals")
    }, 2000);

    // toast.success("Vital added successfully")
    // Consider invalidating queries here if you want immediate refresh
  }

  if (isLoading)
    return (
    //   <DashboardLayout user={user} onLogout={handleLogout} setShowUploadModal={setShowUploadModal} setShowVitalsModal={setShowVitalsModal}>
        <div className="flex justify-center items-center h-full">
          <p>Loading dashboard...</p>
        </div>
    //   </DashboardLayout>
    )

  if (isError)
    return (
        <div className="flex justify-center items-center h-full text-red-500">
          <p>Failed to load dashboard data</p>
        </div>
    )

  return (
    <>
    {/* // <DashboardLayout user={user} onLogout={handleLogout} setShowUploadModal={setShowUploadModal} setShowVitalsModal={setShowVitalsModal}> */}
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || "User"}!</h1>

      {/* Quick Action Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowUploadModal(true)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <FileUp className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Upload Report</h3>
            <p className="text-xs text-muted-foreground">
              Add medical reports or prescriptions
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowVitalsModal(true)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Add Vitals</h3>
            <p className="text-xs text-muted-foreground">
              Track BP, sugar, weight, etc.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Timeline Overview</h3>
            <p className="text-xs text-muted-foreground">
              {files.length + vitals.length} total health events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* You can add more dashboard specific content here, e.g., recent activities, summaries */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example: A card for a summary of latest vitals */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Latest Vitals Summary</h3>
            {vitals.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                Your last blood pressure was: {vitals[0]?.bloodPressure || "N/A"} on{" "}
                {new Date(vitals[0]?.date).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No vitals recorded yet.</p>
            )}
            <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/dashboard/vitals")}>View All Vitals</Button>
          </CardContent>
        </Card>

        {/* Example: A card for recent reports */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Recent Reports</h3>
            {files.length > 0 ? (
              <ul className="text-sm text-muted-foreground space-y-1">
                {files.slice(0, 3).map((file: any) => (
                  <li key={file.id}>- {file.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No reports uploaded yet.</p>
            )}
            <Button variant="link" className="px-0 mt-2" onClick={() => router.push("/dashboard/reports")}>View All Reports</Button>
          </CardContent>
        </Card>
      </div>


      {/* Modals */}
      {/* {showUploadModal && (
        <UploadReportModal
          onClose={() => setShowUploadModal(false)}
          onReportUploaded={handleReportUploaded}
        />
      )}
      {showVitalsModal && (
        <AddVitalsModal
          onClose={() => setShowVitalsModal(false)}
          onVitalAdded={handleVitalAdded}
        />
      )} */}
    {/* // </DashboardLayout> */}
    </>
  )
}