// lib/api/api.ts
import axios, { AxiosRequestConfig, Method } from "axios"
import { useRouter } from "next/navigation"

const baseURL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL,
})

interface ApiRequestOptions {
  method?: Method
  endpoint: string
  params?: Record<string, unknown>
  formData?: FormData | null
  data?: object | null
  token?: string | null
  navigate?: boolean
}

interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

/* ------------------------------------------------------------------ */
/*  Core API Request (used in server components / hooks)              */
/* ------------------------------------------------------------------ */
export const apiRequest = async <T = unknown>({
  method = "GET",
  endpoint,
  params = {},
  formData = null,
  data = null,
  token = null,
  navigate = true,
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  try {
    const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    }

    if (method === "GET") {
      config.params = params
    } else {
      config.data = formData || (data && Object.keys(data).length ? data : undefined)
    }

    const response = await api(config)
    return { data: response.data as T, error: null }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        return { data: null, error: "Network error - unable to reach server" }
      }

      const status = err.response.status
      const errorData = err.response.data as { message?: string; error?: string }

      // Auto redirect on 401 (except login-related endpoints)
      if (
        status === 401 &&
        !["/login", "/signup", "/check-email", "/reset-password"].some((url) =>
          endpoint.includes(url)
        ) &&
        navigate &&
        typeof window !== "undefined"
      ) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("userId")

        // Use window.location for immediate redirect (works in all contexts)
        window.location.href = "/login"
        return { data: null, error: "Session expired. Redirecting to login..." }
      }

      return {
        data: null,
        error: errorData?.message || errorData?.error || "Request failed",
      }
    }

    return { data: null, error: "Unexpected error" }
  }
}

/* ------------------------------------------------------------------ */
/*  React Hook – useApiRequest (for client components)                */
/* ------------------------------------------------------------------ */
export function useApiRequest() {
  const router = useRouter()

  return async <T = unknown>(options: ApiRequestOptions): Promise<ApiResponse<T>> => {
    const result = await apiRequest<T>({
      ...options,
      navigate: true, // always allow navigation in client
    })

    // If 401 already handled in apiRequest, but we want to ensure redirect
    if (result.error?.includes("Session expired") && typeof window !== "undefined") {
      router.push("/login")
    }

    return result
  }
}