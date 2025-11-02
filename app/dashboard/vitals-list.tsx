
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"



// ✅ Display vitals from API
export default function VitalsList({ vitals }: { vitals: any[] }) {
    if (vitals.length === 0) {
        return (
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    No vitals recorded yet. Add your first vitals!
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {vitals.map((vital) => (
                <Card key={vital._id}>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">
                            {new Date(vital.date).toLocaleString()}
                        </p>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {vital.systolic && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                                    <p className="font-semibold">
                                        {vital.systolic}/{vital.diastolic} mmHg
                                    </p>
                                </div>
                            )}
                            {vital.bloodSugar && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Blood Sugar</p>
                                    <p className="font-semibold">{vital.bloodSugar} mg/dL</p>
                                </div>
                            )}
                            {vital.weight && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Weight</p>
                                    <p className="font-semibold">{vital.weight} kg</p>
                                </div>
                            )}
                            {vital.height && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Height</p>
                                    <p className="font-semibold">{vital.height} cm</p>
                                </div>
                            )}
                            {vital.pulse && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Pulse</p>
                                    <p className="font-semibold">{vital.pulse} bpm</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
