import { useMutation, useQuery } from "@tanstack/react-query"
import { apiRequest } from "./api"



export function useGetDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data, error } = await apiRequest({
        method: "GET",
        endpoint: "dashboard",
        navigate: false,
      })

      console.log("Data", data)

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data
    },
  })
}



type UploadPayload = {
  file: File
  name: string
  type: string
  date: string
  summary?: string
}

export function useUploadFileAndSummarize() {
  return useMutation({
    mutationFn: async ({ file, name, type, date, summary }: UploadPayload) => {
      if (!file) throw new Error("No file selected")

      const formData = new FormData()
      formData.append("medicalReport", file)
      formData.append("name", name)
      formData.append("type", type)
      formData.append("date", date)
      if (summary) formData.append("summary", summary)

      const { data, error } = await apiRequest({
        method: "POST",
        endpoint: "files/upload",
        formData,
        navigate: false,
      })

      if (error) {
        const message = typeof error === "string" ? error : (error as any)?.message || "Some message"
        throw new Error(message)
      }

      return data
    },
  })
}
