"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

type Step = "step1" | "step2" | "step3" | "complete"

export default function OnboardingTemplate() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("step1")

  const steps: Step[] = ["step1", "step2", "step3", "complete"]
  const idx = steps.indexOf(step)
  const progress = ((idx + 1) / steps.length) * 100

  const goNext = () => {
    if (step === "step1") setStep("step2")
    else if (step === "step2") setStep("step3")
    else if (step === "step3") setStep("complete")
  }

  const goPrev = () => {
    if (step === "step2") setStep("step1")
    else if (step === "step3") setStep("step2")
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card p-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Onboarding Setup
            </h1>
            <p className="text-sm text-muted-foreground">
              Step {idx + 1} of {steps.length}
            </p>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="mx-auto max-w-2xl">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-2xl">
          {step === "step1" && <Step1 />}
          {step === "step2" && <Step2 />}
          {step === "step3" && <Step3 />}
          {step === "complete" && <CompleteStep />}
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="border-t border-border bg-card p-6">
        <div className="mx-auto flex max-w-2xl justify-between">
          {step !== "step1" && step !== "complete" && (
            <Button variant="outline" onClick={goPrev}>
              Previous
            </Button>
          )}

          {step !== "complete" && (
            <Button onClick={goNext}>
              {step === "step3" ? "Finish" : "Next"}
            </Button>
          )}

          {step === "complete" && (
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}

/* --------------------------------------------------------------- */
/* Example Step Components                                         */
/* --------------------------------------------------------------- */

function Step1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Brief intro about onboarding.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Explain what the user will achieve in this onboarding flow.</p>
      </CardContent>
    </Card>
  )
}

function Step2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Collect basic details.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Form fields go here (e.g., name, email, preferences).</p>
      </CardContent>
    </Card>
  )
}

function Step3() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Final Setup</CardTitle>
        <CardDescription>Confirm and review info.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Summarize data before completion.</p>
      </CardContent>
    </Card>
  )
}

function CompleteStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          Setup Complete!
        </CardTitle>
        <CardDescription>You're ready to go.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-lg font-semibold text-green-900 dark:text-green-100">
          Congratulations 🎉
        </p>
        <p className="mt-2 text-sm text-green-800 dark:text-green-200">
          Everything is set up. You can start using the app now.
        </p>
      </CardContent>
    </Card>
  )
}
