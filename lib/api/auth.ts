import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./api";


interface LoginPayload {
  email: string;
  password: string;
}


export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "auth/login",
        data: { email, password },
        navigate: false, // don't auto-redirect on 401 for login
      });

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      console.log("data", data)
      // Save token and user in localStorage
      const typedData = data as any;
      const token = typedData?.data?.token;
      const user = typedData?.data?.user;

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (user) localStorage.setItem("userId", user._id);

      return data;
    },
  });
}


interface RegisterPayload {
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async ({ email, password }: RegisterPayload) => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "auth/signUp",
        data: { email, password },
        navigate: false, // don't auto-redirect
      });

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }


      // console.log("data", data.data)

      // Optionally save token if returned
      const typedData = data as any;
      const token = typedData?.data?.token;
      const user = typedData?.data?.user;

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (user) localStorage.setItem("userId", user._id);


      return data;
    },
  });
}


interface VerifyOTPPayload {
  otp: string;
  // token: string; // token returned from signup
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: async ({ otp }: VerifyOTPPayload) => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "auth/verifyOtp",
        data: { otp },
      });
      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data;
    },
  });
}


export function useResendOTP() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "auth/resend-otp",
        // data: {},
      });

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data;
    },
  });
}


interface ForgetPasswordPayload {
  email: string;
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: async ({ email }: ForgetPasswordPayload) => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "user/forgetPassword",
        data: { email },
      });

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data;
    },
  });
}

interface ResetPasswordPayload {
  password: string;
  token: string; // token from forgetPassword email
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ password, token }: ResetPasswordPayload) => {
      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "user/resetPassword",
        data: { password },
        // headers: { Authorization: `Bearer ${token}` },
      });

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data;
    },
  });
}
