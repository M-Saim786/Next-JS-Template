"use client"

import React, { ReactNode, ErrorInfo } from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("🚨 ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[80vh] items-center justify-center bg-background">
          <Card className="max-w-md w-full shadow-lg border border-border">
            <CardHeader className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">
                Something went wrong
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                An unexpected error occurred while rendering this page.
              </p>

              {this.state.error?.message && (
                <pre className="bg-muted text-muted-foreground p-3 rounded-lg text-xs overflow-auto border border-border">
                  {this.state.error.message}
                </pre>
              )}

              <div className="flex justify-center">
                <Button onClick={this.handleReload} className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  Reload Page
                </Button>
              </div>

              <p className="text-xs text-muted-foreground italic">
                If this keeps happening, please contact support.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
