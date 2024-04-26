"use client"

import { getlatlon } from "@/lib/get-location"
import { getLocationFromLatLng } from "@/lib/utils"
import { useEffect, useState } from "react"

export const MyLocation = () => {
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
            console.log("get loc", data.locality, data.city, data.countryName)

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
