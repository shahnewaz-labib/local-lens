"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { getlatlon } from "@/lib/get-location"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { userLocationAtom } from "@/stores/user-location"
import { Button } from "./ui/button"

export default function SearchNearbyAttractions() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [location, setLocation] = useState("")
  useEffect(() => {
    getlatlon()
      .then(({ lat, lng }) => {
        setUserLocation({ lat, lng })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          value={location}
          onChange={(e) => {
            setLocation(e.currentTarget.value)
          }}
          placeholder="Search Attractions in a City"
          className="pl-8 sm:w-[300px] md:w-[500px]"
        />
      </div>
      <Button
        className="text-xs"
        onClick={() => {
          setLocation(`${userLocation.lat}, ${userLocation.lng}`)
        }}
      >
        Use My Location
      </Button>
    </div>
  )
}
