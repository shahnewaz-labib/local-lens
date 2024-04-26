"use client"

import { getLocations } from "@/actions/location-auto-complete"
import { getlatlon } from "@/lib/get-location"
import { userLocationAtom } from "@/stores/user-location"
import { useAtom } from "jotai"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Selection } from "./selection"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const categorySet = new Set<string>()

export default function SearchNearbyAttractions() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [city, setCity] = useState("")
  const [locations, setLocations] = useState<any>()
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState("")
  const [cityLoading, setCityLoading] = useState(false)
  const router = useRouter()

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
    setCityLoading(true)
    const locations = await getLocations(city)
    setSelectedLocationIndex(-1)
    setSelectedCategories("")
    setLocations(locations)
    categorySet.clear()
    setCityLoading(false)
  }

  const onSearch = async () => {
    const { place_id } = locations[selectedLocationIndex]
    const cats = selectedCategories.replaceAll(" ", "").toLowerCase()
    router.push(`/places/${place_id}?categories=${cats}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative">
          <form onSubmit={onCitySubmit} className="flex gap-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={city}
              onChange={(e) => {
                setCity(e.currentTarget.value)
              }}
              placeholder="Enter city name or lat,lon"
              className="pl-8 sm:w-[300px] md:w-[500px]"
            />
            <Button type="submit">Search</Button>
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
      {cityLoading && (
        <p className="mx-auto animate-pulse">Loading Result...</p>
      )}
      {locations && selectedLocationIndex == -1 && (
        <div className="flex flex-col gap-2">
          <p>Select a location:</p>
          <div className="flex flex-col gap-2">
            {locations.map((city: any, ind: number) => {
              return (
                <button
                  key={ind}
                  className="flex w-min bg-primary-foreground px-2"
                  onClick={() => {
                    setSelectedLocationIndex(ind)
                  }}
                >
                  <p className="w-[300px] px-4 py-2 md:w-[600px]">
                    {city.formatted}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}
      {locations && selectedLocationIndex >= 0 && (
        <div className="flex flex-col">
          <p>Selected Location: {locations[selectedLocationIndex].formatted}</p>
          <div className="flex items-center gap-2">
            <p>Add categories:</p>
            <Selection
              items={categories.filter((cat) => !categorySet.has(cat))}
              placeholder="Category listing"
              onSelectedChange={(value: string) => {
                if (!value) return
                categorySet.add(value)
                console.log(categorySet)
                if (selectedCategories.length === 0) {
                  setSelectedCategories(value)
                  return
                }
                setSelectedCategories(`${selectedCategories}, ${value}`)
              }}
            />
          </div>

          {selectedCategories && (
            <div>
              <p>Selected Categories: {selectedCategories}</p>
              <Button onClick={onSearch} className="mt-4 w-full">
                Search Places
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const categories = [
  "Healthcare",
  "Accommodation",
  "Education",
  "Activity",
  "Airport",
  "Commercial",
  "Catering",
  "Heritage",
  "Leisure",
  "Natural",
  "Office",
  "Parking",
  "Pet",
  "Tourism",
  "Religion",
  "Camping",
  "Amenity",
  "Beach",
  "Sport",
  "Production",
]
