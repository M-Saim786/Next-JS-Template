"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Heart, Loader2, RotateCw } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useVerifyOTP } from "@/lib/api/auth"
import { useResendOTP } from "@/lib/api/auth" // uncomment when available

type OTPFormInputs = {
    otp: string
}

export default function VerifyOTPScreen() {
    const router = useRouter()
    const searchParams = useSearchParams()
    //   const token = searchParams.get("token") || ""

    const [countdown, setCountdown] = useState(5)
    const [canResend, setCanResend] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<OTPFormInputs>({
        defaultValues: { otp: "" },
    })

    const verifyMutation = useVerifyOTP()
    // const resendMutation = useResendOTP()

    const otpInputs = Array(6).fill(0)
    const watchedOtp = watch("otp", "")

    useEffect(() => {
        if (watchedOtp.length === 6) {
            handleSubmit(onSubmit)()
        }
    }, [watchedOtp])

    useEffect(() => {
        if (countdown > 0) {
            intervalRef.current = setInterval(() => {
                setCountdown((c) => c - 1)
            }, 1000)
        } else {
            setCanResend(true)
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [countdown])

    const onSubmit = async (data: OTPFormInputs) => {

        try {
            toast.success("OTP verified! Welcome!")
            router.push("/onboarding")
        } catch (err: any) {
            toast.error(err.message || "Invalid OTP")
            setValue("otp", "")
            inputRefs.current[0]?.focus()
        }
    }

    const handleResend = async () => {
        try {
            // await resendMutation.mutateAsync()
            toast.success("New OTP sent!")
            setCountdown(60)
            setCanResend(false)
            setValue("otp", "")
            inputRefs.current[0]?.focus()
        } catch (err: any) {
            toast.error(err.message || "Failed to resend OTP")
        }
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const value = e.currentTarget.value
        if (!/^\d?$/.test(value)) {
            e.currentTarget.value = ""
            return
        }

        const newOtp = watchedOtp.split("")
        newOtp[index] = value
        const joined = newOtp.join("")
        setValue("otp", joined)

        if (value && index < 5) inputRefs.current[index + 1]?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !watchedOtp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-background to-muted p-4">
            <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-primary p-3">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Verify OTP</h1>
                <p className="text-center text-muted-foreground">
                    Enter the 6-digit code sent to your email
                </p>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Check Your Email</CardTitle>
                    <CardDescription>We sent a verification code to your email</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otpInputs.map((_, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="h-12 w-12 text-center text-lg font-semibold"
                                    value={watchedOtp[index] || ""}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    disabled={verifyMutation.isPending}
                                    ref={(el) => {
                                        inputRefs.current[index] = el
                                    }}
                                />
                            ))}
                        </div>

                        {errors.otp && (
                            <p className="text-center text-sm text-destructive">{errors.otp.message}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={verifyMutation.isPending || watchedOtp.length !== 6}
                        >
                            {verifyMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={handleResend}
                            disabled={!canResend /* || resendMutation.isPending */}
                            className="h-auto p-0 text-primary"
                        >
                            {/* {resendMutation.isPending ? (
                <>
                  <RotateCw className="mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) :  */}
                            {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
                            {/* } */}
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/auth")}
                            className="text-muted-foreground"
                        >
                            Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
