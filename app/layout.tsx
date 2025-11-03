import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { Suspense } from "react";
import FullPageLoader from "@/components/ui/FullPageLoader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { userQueryClient } from "@/lib/query-client";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next js Starter",
  description: "Next js Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Toaster
          position="top-right"
          richColors
        />

        <ErrorBoundary>
          <Suspense fallback={<FullPageLoader />}>
            <QueryClientProvider client={userQueryClient}>
              {children}
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
        {/* {children} */}
      </body>
    </html>
  );
}
