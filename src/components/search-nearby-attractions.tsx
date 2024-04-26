"use client"

import { Search, SquareArrowOutUpRight } from "lucide-react"
import { Input } from "./ui/input"
import { getlatlon } from "@/lib/get-location"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { userLocationAtom } from "@/stores/user-location"
import { Button } from "./ui/button"
import { getLocations } from "@/actions/location-auto-complete"
import { Selection } from "./selection"
import { searchNearbyWithinCity } from "@/actions/geoapify"
import { useRouter } from "next/navigation"

const categorySet = new Set<string>()

export default function SearchNearbyAttractions() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [city, setCity] = useState("")
  const [locations, setLocations] = useState<any>()
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState("")
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
    const locations = await getLocations(city)
    setSelectedLocationIndex(-1)
    setSelectedCategories("")
    setLocations(locations)
    categorySet.clear()
  }

  const onSearch = async () => {
    const { place_id } = locations[selectedLocationIndex]
    /* const places = await searchNearbyWithinCity( */
    /*   place_id, */
    /*   selectedCategories.replaceAll(" ", "").toLowerCase(), */
    /* ) */
    const cats = selectedCategories.replaceAll(" ", "").toLowerCase()
    router.push(`/places/${place_id}?categories=${cats}`)
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
        <div>
          <p>Selected Location: {locations[selectedLocationIndex].formatted}</p>
        </div>
      )}
      {selectedLocationIndex >= 0 && (
        <div className="flex flex-col">
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
          <p>Selected Categories: {selectedCategories}</p>
        </div>
      )}
      {selectedCategories && (
        <Button className="w-[500px]" onClick={onSearch}>
          Search
        </Button>
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
