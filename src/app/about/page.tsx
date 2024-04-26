"use client"

import { getlatlon } from "@/lib/get-location"
import { useEffect, useState } from "react"

export default function About() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  useEffect(() => {
    getlatlon()
      .then(({ lat, lng }) => {
        console.log(`Latitude: ${lat}, Longitude: ${lng}`)
        setLocation({ lat, lng })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <p>{location.lat}</p>
      <p>{location.lng}</p>
    </div>
  )
}
