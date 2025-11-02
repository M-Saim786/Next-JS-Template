"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing/landing-page"
// import { LandingPage } from "@/components/landing/landing-page"

export default function Home() {
  const router = useRouter()
  // const [appState, setAppState] = useState<"landing" | "auth" | "onboarding" | "dashboard" | "loading">("landing")
  const [user, setUser] = useState<any>(null)

  // useEffect(() => {
  //   // Check if user is logged in
  //   const savedUser = localStorage.getItem("healthVaultUser")
  //   const hasCompletedOnboarding = localStorage.getItem("onboardingComplete")

  //   if (savedUser) {
  //     const userData = JSON.parse(savedUser)
  //     setUser(userData)
  //     if (hasCompletedOnboarding) {
  //       setAppState("dashboard")
  //     } else {
  //       setAppState("onboarding")
  //     }
  //   } else {
  //     setAppState("landing")
  //   }
  // }, [])

  const handleGetStarted = () => {
    // setAppState("auth")
    router.push("/auth")
  }


  // if (appState === "loading") {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-foreground">HealthVault</h2>
  //         <p className="text-muted-foreground mt-2">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <main>
       <LandingPage onGetStarted={handleGetStarted} />
      {/* {appState === "auth" && <AuthPage onSuccess={handleAuthSuccess} />} */}
    </main>
  )
}
