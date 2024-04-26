"use client"

import { getlatlon } from "@/lib/get-location"
import { useEffect } from "react"

export default function About() {
  useEffect(() => {
    getlatlon()
      .then(({ lat, lng }) => {
        console.log(`Latitude: ${lat}, Longitude: ${lng}`)
        // Do something with lat and lng
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <div>
      <p>About Page</p>
    </div>
  )
}
