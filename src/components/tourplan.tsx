"use client"
import { useState, useEffect } from "react"
import { cohereCall } from "@/actions/tour-plan"

export default function TourPlan(props) {
  const [planMessage, setPlanMessage] = useState<string>("")

  useEffect(() => {
    cohereCall(props.plan)
      .then((data) => {
        setPlanMessage(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Tour Plan</h1>
      {planMessage}
    </div>
  )
}
