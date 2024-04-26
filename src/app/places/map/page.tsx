"use client"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

import "mapbox-gl/dist/mapbox-gl.css"

import MapComponent from "@/components/map/map"
import { useSearchParams } from "next/navigation"
import places from "@/lib/places.json"
import { useEffect, useState } from "react"
import { searchNearby } from "@/actions/geoapify"
import Loading from "@/components/loading"

export default function Page() {
  const searchParams = useSearchParams()
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const categories = searchParams.get("categories")
  let radius = searchParams.get("radius")
  const [places, setPlaces] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  if (!radius) {
    radius = "20"
  }

  if (!lat || !lon || !categories) {
    return <p>lat, lon or categories not provided in search param</p>
  }

  useEffect(() => {
    searchNearby(Number(lat), Number(lon), categories, Number(radius)).then(
      (data: any) => {
        setIsLoading(false)
        setPlaces(data)
      },
    )
  }, [])

  return (
    <div>
      {isLoading && <Loading />}
      {places && <MapComponent lat={lat} lon={lon} places={places} />}
    </div>
  )
}
