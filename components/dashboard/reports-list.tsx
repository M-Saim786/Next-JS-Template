"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertCircle, Download, ChevronDown } from "lucide-react" // Import ChevronDown
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible" // Import Collapsible components
// import { format } from "date-fns" // If you use date-fns, uncomment this

type Report = {
  _id: string
  fileName: string
  fileUrl: string
  fileType: string
  uploadDate: string
  aiSummary: {
    english: string
    romanUrdu: string
    doctorQuestions: string[]
    foodsToEat: string[]
    foodsToAvoid: string[]
    homeRemedies: string[]
    disclaimer: string
  }
}

export function ReportsList({ reports }: { reports: Report[] }) {
  if (!reports || reports.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No reports uploaded yet. Upload your first report!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {reports.map((report) => {
        const date = new Date(report.uploadDate)
        // const formattedDate = format(date, "dd MMM yyyy, h:mm a") // Uncomment if using date-fns

        return (
          <Collapsible key={report._id} asChild>
            <Card className="hover:shadow-md transition-shadow">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">
                          {report.fileName}
                        </CardTitle>
                        <CardDescription>
                          {date.toLocaleString()} {/* Use toLocaleString for now */}
                          {/* {formattedDate} */}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Badge variant="secondary">{report.fileType}</Badge> */}
                      <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {/* English Summary */}
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      English Summary
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {report.aiSummary.english || "—"}
                    </p>
                  </div>

                  {/* Roman Urdu Summary */}
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">
                      خلاصہ (رومن اردو)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {report.aiSummary.romanUrdu || "—"}
                    </p>
                  </div>

                  {/* Doctor Questions */}
                  {report.aiSummary.doctorQuestions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">
                        سوالات جو ڈاکٹر سے پوچھ سکتے ہیں
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {report.aiSummary.doctorQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Foods */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Foods to Eat */}
                    {report.aiSummary.foodsToEat.length > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          کھانے کی اشیاء
                        </p>
                        <ul className="text-xs text-green-700 space-y-0.5">
                          {report.aiSummary.foodsToEat.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Foods to Avoid */}
                    {report.aiSummary.foodsToAvoid.length > 0 && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-1">
                          پرہیز کریں
                        </p>
                        <ul className="text-xs text-red-700 space-y-0.5">
                          {report.aiSummary.foodsToAvoid.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Home Remedies */}
                  {report.aiSummary.homeRemedies.length > 0 && (
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        گھریلو علاج
                      </p>
                      <ul className="text-xs text-amber-700 space-y-0.5">
                        {report.aiSummary.homeRemedies.map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{report.aiSummary.disclaimer}</p>
                  </div>

                  {/* Download Button */}
                  <Button
                    className="w-full"
                    onClick={() => window.open(report.fileUrl as string, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )
      })}
    </div>
  )
}