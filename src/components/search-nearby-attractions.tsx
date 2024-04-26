"use client"

import { Search, SquareArrowOutUpRight } from "lucide-react"
import { Input } from "./ui/input"
import { getlatlon } from "@/lib/get-location"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { userLocationAtom } from "@/stores/user-location"
import { Button } from "./ui/button"
import { getLocations } from "@/actions/location-auto-complete"

export default function SearchNearbyAttractions() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [city, setCity] = useState("")
  const [locations, setLocations] = useState<any>()
  useEffect(() => {
    getlatlon()
      .then(({ lat, lng }) => {
        setUserLocation({ lat, lng })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const onCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const locations = await getLocations(city)
    setLocations(locations)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative">
          <form onSubmit={onCitySubmit}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={city}
              onChange={(e) => {
                setCity(e.currentTarget.value)
              }}
              placeholder="Search city"
              className="pl-8 sm:w-[300px] md:w-[500px]"
            />
          </form>
        </div>
        <Button
          className="text-xs"
          onClick={() => {
            setCity(`${userLocation.lat}, ${userLocation.lng}`)
          }}
        >
          Use My Location
        </Button>
      </div>
      {locations && (
        <div className="flex flex-col gap-2">
          <p>Search Result:</p>
          <div className="flex flex-col gap-2">
            {locations.map((city: any) => {
              return (
                <div className="flex w-min bg-primary-foreground px-2">
                  <p className="w-[300px] px-4 py-2 md:w-[600px]">
                    {city.formatted}
                  </p>
                  <button title="Find Attraction Places">
                    <SquareArrowOutUpRight />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
