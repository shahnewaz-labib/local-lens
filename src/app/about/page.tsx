"use client"

import { getlatlon } from "@/lib/get-location"
import { userLocationAtom } from "@/stores/user-location"
import { useAtom } from "jotai"
import { useEffect } from "react"

export default function About() {
  const [userLocation, setUserLocation] = useAtom(userLocationAtom)
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
    <div>
      <p>{userLocation.lat}</p>
      <p>{userLocation.lng}</p>
    </div>
  )
}
