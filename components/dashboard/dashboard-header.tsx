"use client"

import { Button } from "@/components/ui/button"
import { Heart, LogOut } from "lucide-react"

export function DashboardHeader({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Brand Name</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
          <Button variant="outline" size="sm" onClick={()=>{
            console.log("logout")
            onLogout()
          }} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
