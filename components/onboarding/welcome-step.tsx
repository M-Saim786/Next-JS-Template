"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function WelcomeStep({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user?.name}!</CardTitle>
        <CardDescription>Let's set up your health vault</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Health Vault helps you organize, store, and understand all your medical information in one secure place.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            <div>
              <h3 className="font-semibold text-foreground">Upload Medical Reports</h3>
              <p className="text-sm text-muted-foreground">
                PDF or images of your lab reports, prescriptions, and health documents
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            <div>
              <h3 className="font-semibold text-foreground">AI-Powered Summaries</h3>
              <p className="text-sm text-muted-foreground">
                Get instant explanations of your reports in simple language
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            <div>
              <h3 className="font-semibold text-foreground">Track Your Vitals</h3>
              <p className="text-sm text-muted-foreground">
                Monitor blood pressure, blood sugar, weight, and other health metrics
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            <div>
              <h3 className="font-semibold text-foreground">Bilingual Support</h3>
              <p className="text-sm text-muted-foreground">Read summaries in English or Roman Urdu</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
