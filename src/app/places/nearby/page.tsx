"use client"
import { searchNearby } from "@/actions/geoapify"
import Loading from "@/components/loading"
import Places from "@/components/places"
import { selectedPlaceIdAtom } from "@/stores/selected-location"
import { useAtomValue } from "jotai"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NearbyPlaces() {
  const searchParams = useSearchParams()
  const categories = searchParams.get("categories")
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const radius = searchParams.get("radius")
  const selectedPlaceId = useAtomValue(selectedPlaceIdAtom)
  const [isLoading, setIsLoading] = useState(true)
  const [places, setPlaces] = useState<any>()
  const router = useRouter()
  if (!lat || !lon || !categories) {
    router.push("/test")
    return
  }

  useEffect(() => {
    searchNearby(
      selectedPlaceId,
      Number(lat),
      Number(lon),
      categories,
      Number(radius),
    ).then((data) => {
      setIsLoading(false)
      setPlaces(data)
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading && <Loading />}
      {places && <Places places={places} />}
    </div>
  )
}
