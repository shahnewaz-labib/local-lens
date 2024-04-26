"use client"

import { getlatlon } from "@/lib/get-location"
import { getLocationFromLatLng } from "@/lib/utils"
import { userLocationAtom } from "@/stores/user-location"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export const MyLocation = () => {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    locality: "",
    city: "",
    countryName: "",
  })

  useEffect(() => {
    getlatlon()
      .then(({ lat, lng }) => {
        getLocationFromLatLng({ lat: lat, lng: lng })
          .then((data) => {
            setUserLocation({ lat, lng })

            window.localStorage.setItem("locality", data.locality)
            window.localStorage.setItem("city", data.city)
            window.localStorage.setItem("country", data.countryName)
            setLocation({ lat, lng, locality: "", city: "", countryName: "" })
          })
          .catch((error: any) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const locality = window.localStorage.getItem("locality")
  const city = window.localStorage.getItem("city")
  const country = window.localStorage.getItem("country")

  return (
    <div>
      <code>
        {locality}, {city}, {country}
      </code>
    </div>
  )
}
