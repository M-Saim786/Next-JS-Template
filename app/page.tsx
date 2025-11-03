"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing/landing-page"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)


  const handleGetStarted = () => {
    // setAppState("auth")
    router.push("/auth")
  }

  return (
    <main>
       <LandingPage onGetStarted={handleGetStarted} />
      {/* {appState === "auth" && <AuthPage onSuccess={handleAuthSuccess} />} */}
    </main>
  )
}
