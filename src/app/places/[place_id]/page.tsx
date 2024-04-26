"use client"

import { searchNearbyWithinCity } from "@/actions/geoapify"
import Loading from "@/components/loading"
import Places from "@/components/places"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PlacesInCity() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categories = searchParams.get("categories")
  const place_id = params.place_id as string
  const router = useRouter()
  const [places, setPlaces] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  if (!place_id || !categories) {
    router.push("/test")
    return
  }

  useEffect(() => {
    searchNearbyWithinCity(place_id, categories).then((data) => {
      setIsLoading(false)
      setPlaces(data)
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isLoading && <Loading />}
      {places && <Places places={places} />}
    </div>
  )
}
