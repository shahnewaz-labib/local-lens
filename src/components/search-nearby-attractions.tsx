"use client"

import { getLocations } from "@/actions/location-auto-complete"
import { Checkbox } from "@/components/ui/checkbox"
import { getlatlon } from "@/lib/get-location"
import { userLocationAtom } from "@/stores/user-location"
import { useAtom, useSetAtom } from "jotai"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { IoLocationSharp } from "react-icons/io5"
import { Selection } from "./selection"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { categories } from "@/lib/categories"
import { selectedPlaceIdAtom } from "@/stores/selected-location"
import { locationsAtom } from "@/stores/searched-locations"
import { selectedCategoriesAtom } from "@/stores/selected-categories"

const categorySet = new Set<string>(categories.slice(0, 3))
let preSelectedCategories = categories[0]
for (let i = 1; i < 3; i++) {
  preSelectedCategories = preSelectedCategories + ", " + categories[i]
}
const min_radius = 1
const max_radious = 50

export default function SearchNearbyAttractions() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
  const [city, setCity] = useState("")
  const [locations, setLocations] = useAtom(locationsAtom)
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1)
  const [selectedCategories, setSelectedCategories] = useAtom(
    selectedCategoriesAtom,
  )
  const [cityLoading, setCityLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [radius, setRadius] = useState(min_radius)
  const router = useRouter()
  const setSelectedPlaceId = useSetAtom(selectedPlaceIdAtom)

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
    const locationsFromCity = await getLocations(city)
    setSelectedLocationIndex(-1)
    setSelectedCategories(preSelectedCategories)
    setLocations(locationsFromCity)
    categorySet.clear()
    setCityLoading(false)
  }

  const onSearch = async (inMap: boolean) => {
    const { lat, lon } = locations[selectedLocationIndex]
    const cats = selectedCategories.replaceAll(" ", "").toLowerCase()
    if (inMap === true) {
      let url = `/places/map?categories=${cats}&lat=${lat}&lon=${lon}`
      if (isChecked === true) {
        url = url + `&radius=${radius}`
      }
      router.push(url)
      return
    }
    if (isChecked === true) {
      router.push(
        `/places/nearby?categories=${cats}&lat=${lat}&lon=${lon}&radius=${radius}`,
      )
      return
    }
    router.push(`/places/city?categories=${cats}`)
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
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
            <Button type="submit">
              <FaSearch className="mr-2" />
              Search
            </Button>
          </form>
        </div>
        <Button
          className="text-xs"
          onClick={() => {
            setCity(`${userLocation.lat}, ${userLocation.lng}`)
          }}
        >
          <IoLocationSharp className="mr-2 text-lg" /> Use My Location
        </Button>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={isChecked}
          onClick={() => setIsChecked((checked) => !checked)}
        />
        <label
          htmlFor="terms"
          className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Set Radius (km)
        </label>
        {isChecked && (
          <div className="ml-auto">
            <Input
              type="number"
              min={min_radius}
              max={max_radious}
              value={radius}
              onChange={(e) => {
                const value = Number(e.currentTarget.value)
                setRadius(value)
              }}
              className="h-8"
            />
          </div>
        )}
      </div>
      {cityLoading && (
        <p className="mx-auto animate-pulse">Loading Result...</p>
      )}
      {locations.length > 0 && selectedLocationIndex == -1 && (
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
                    setSelectedPlaceId(city.place_id)
                    setCity(city.formatted)
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
          <div className="mt-4 flex items-center gap-4">
            <p>Select categories:</p>
            <Selection
              items={categories.filter((cat) => !categorySet.has(cat))}
              placeholder="Category Listing"
              onSelectedChange={(value: string) => {
                if (!value) return
                categorySet.add(value)
                if (selectedCategories.length === 0) {
                  setSelectedCategories(value)
                  return
                }
                setSelectedCategories(`${selectedCategories}, ${value}`)
              }}
            />
            {selectedCategories && (
              <Button
                className="w-20"
                onClick={() => {
                  setSelectedCategories("")
                  categorySet.clear()
                }}
              >
                Clear
              </Button>
            )}
          </div>

          {selectedCategories && (
            <div className="mt-4">
              <p>
                Selected Categories: <code>{selectedCategories}</code>
              </p>
              <div className="mt-4 flex gap-4">
                <Button onClick={() => onSearch(false)} className="w-1/2">
                  Search Places
                </Button>
                <Button onClick={() => onSearch(true)} className="w-1/2">
                  See In Map
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
