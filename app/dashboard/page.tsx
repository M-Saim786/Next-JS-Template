"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Activity,
  FileText,
  TrendingUp,
  Calendar,
  Stethoscope,
  Pill,
  Syringe,
} from "lucide-react";
import { format } from "date-fns";
import DashboardLayout from "./layout";

export default function DashboardHomePage() {
  // Fake user (no localStorage needed)
  const user = {
    firstName: "Aarav",
    lastName: "Patel",
    email: "aarav@example.com",
  };

  // DUMMY VITALS
  const vitals = [
    { date: "2025-11-02", bp: "118/76", pulse: 72, spo2: 98, weight: 68.5 },
    { date: "2025-10-30", bp: "120/78", pulse: 70, spo2: 99, weight: 68.2 },
    { date: "2025-10-28", bp: "122/80", pulse: 74, spo2: 97, weight: 68.7 },
  ];

  // DUMMY REPORTS
  const reports = [
    { id: 1, name: "HbA1c Report – Oct 2025", type: "Lab", date: "2025-10-15" },
    { id: 2, name: "Lipid Profile", type: "Lab", date: "2025-10-10" },
    { id: 3, name: "Dr. Sharma Prescription", type: "Rx", date: "2025-09-28" },
    { id: 4, name: "ECG – Normal Sinus Rhythm", type: "Cardio", date: "2025-09-20" },
  ];

  // DUMMY HEALTH SCORE
  const healthScore = 89;
  const trend = "+4";

  return (
    <>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {user.firstName}! 🌟
        </h1>
        <p className="text-muted-foreground mt-2">
          Today is {format(new Date(), "EEEE, MMMM d, yyyy")}. Here's your health snapshot.
        </p>
      </div>

      {/* Dummy Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* 1. Latest Vitals */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-500" />
              Latest Vitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Blood Pressure</p>
                <p className="text-2xl font-bold">{vitals[0].bp} mmHg</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pulse</p>
                <p className="text-xl font-semibold">{vitals[0].pulse} bpm</p>
              </div>
              <div className="pt-2">
                <Badge variant="secondary" className="text-xs">
                  {format(new Date(vitals[0].date), "MMM d")}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              <Activity className="h-4 w-4 mr-2" />
              View Trend
            </Button>
          </CardContent>
        </Card>

        {/* 2. Recent Reports */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-blue-500" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {reports.slice(0, 3).map((r) => (
                <li key={r.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[160px]">{r.name}</span>
                  <Badge variant="outline">{r.type}</Badge>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="w-full mt-3">
              See all {reports.length} reports →
            </Button>
          </CardContent>
        </Card>

        {/* 3. Health Score */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600">
                {healthScore}
              </div>
              <Progress value={healthScore} className="mt-3 h-2" />
              <p className="text-sm text-emerald-600 font-medium mt-2">
                {trend} from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Upcoming Reminders */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-purple-500" />
              Next 7 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Pill className="h-4 w-4 text-purple-500" />
                <span>Metformin 500mg – 8 AM</span>
              </li>
              <li className="flex items-center gap-3">
                <Syringe className="h-4 w-4 text-indigo-500" />
                <span>Thyroid Check – Nov 8</span>
              </li>
              <li className="flex items-center gap-3">
                <Stethoscope className="h-4 w-4 text-pink-500" />
                <span>Dr. Gupta Follow-up – Nov 10</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 5. Quick Tip (Lorem Ipsum) */}
        <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4 bg-muted/40">
          <CardHeader>
            <CardTitle className="text-xl">Health Tip of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris. <strong>Drink 8 glasses of water daily</strong> to
              stay hydrated and support kidney function.
            </p>
            <Button className="mt-4" size="sm">
              Read Full Article
            </Button>
          </CardContent>
        </Card>

        {/* 6. Dummy Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">127</p>
              <p className="text-sm text-muted-foreground">Days tracked</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Reports uploaded</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Doctors linked</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}