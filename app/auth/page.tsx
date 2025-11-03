"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Heart, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

type LoginFormInputs = {
  email: string
  password: string
}

type SignupFormInputs = {
  name: string
  email: string
  password: string
}

export default function DummyAuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)

  // --- Login form ---
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>()

  const onLogin = (data: LoginFormInputs) => {
    console.log("Dummy login data:", data)
    toast.success("Logged in successfully (dummy)")
    router.push("/dashboard")

  }

  // --- Signup form ---
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormInputs>()

  const onSignup = (data: SignupFormInputs) => {
    console.log("Dummy signup data:", data)
    toast.success("Account created successfully (dummy)")
    router.push("/auth/verify-otp")

  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-background to-muted p-4">
      {/* Header / Branding */}
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-primary p-3">
          <Heart className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Brand Name</h1>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "login" | "signup")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login">
              <form
                onSubmit={handleLoginSubmit(onLogin)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    {...registerLogin("email", {
                      required: "Email is required",
                    })}
                  />
                  {loginErrors.email && (
                    <p className="text-sm text-destructive">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••"
                      className="pr-10"
                      {...registerLogin("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowLoginPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-sm text-destructive">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup">
              <form
                onSubmit={handleSignupSubmit(onSignup)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    {...registerSignup("name", {
                      required: "Name is required",
                    })}
                  />
                  {signupErrors.name && (
                    <p className="text-sm text-destructive">
                      {signupErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    {...registerSignup("email", {
                      required: "Email is required",
                    })}
                  />
                  {signupErrors.email && (
                    <p className="text-sm text-destructive">
                      {signupErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••"
                      className="pr-10"
                      {...registerSignup("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowSignupPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {signupErrors.password && (
                    <p className="text-sm text-destructive">
                      {signupErrors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
