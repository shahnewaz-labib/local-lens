"use client"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

import "mapbox-gl/dist/mapbox-gl.css"

import MapComponent from "@/components/map/map"
import { useSearchParams } from "next/navigation"
import places from "@/lib/places.json"

export default function Page() {
  const searchParams = useSearchParams()
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return <p>lat, lon not provided in search param</p>
  }

  return (
    <div>
      <MapComponent lat={lat} lon={lon} places={places} />
    </div>
  )
}
