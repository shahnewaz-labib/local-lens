"use client"
import { searchNearbyWithinCity } from "@/actions/geoapify"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Places() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categories = searchParams.get("categories")
  const [places, setPlaces] = useState<any>()
  useEffect(() => {
    searchNearbyWithinCity(params.place_id, categories).then((data) => {
      console.log(data)
      setPlaces(data)
    })
  }, [])

  return (
    <div className="p-4">
      <p>List of places:</p>
      <div>
        {places &&
          places.map((place) => {
            return (
              <div>
                <p>{place.name}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
