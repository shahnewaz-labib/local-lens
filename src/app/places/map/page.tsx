"use client"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

import "mapbox-gl/dist/mapbox-gl.css"

import MapComponent from "@/components/map/map"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { searchNearby, searchNearbyWithinCity } from "@/actions/geoapify"
import Loading from "@/components/loading"
import { useAtomValue } from "jotai"
import { selectedPlaceIdAtom } from "@/stores/selected-location"

export default function Page() {
  const searchParams = useSearchParams()
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const categories = searchParams.get("categories")
  let radius = searchParams.get("radius")
  const selectedPlaceId = useAtomValue(selectedPlaceIdAtom)
  const [places, setPlaces] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  if (!categories) {
    return <p>categories not provided in search param</p>
  }

  useEffect(() => {
    if (radius && lat && lon) {
      searchNearby(
        selectedPlaceId,
        Number(lat),
        Number(lon),
        categories,
        Number(radius),
      ).then((data: any) => {
        setIsLoading(false)
        setPlaces(data)
      })
    } else {
      searchNearbyWithinCity(selectedPlaceId, categories).then((data) => {
        setIsLoading(false)
        setPlaces(data)
      })
    }
  }, [])

  return (
    <div>
      {isLoading && <Loading />}
      {places && <MapComponent lat={lat} lon={lon} places={places} />}
    </div>
  )
}
