"use client"
import TourPlan from "@/components/tourplan"

export default function Test() {
  // parameters
  const place_id =
    "51fe84b7f8689a564059ce302d3e4fca3740f00102f901bd59d3150000000092030b416d617269204468616b61"
  const lat = 23.8
  const lon = 90.65
  const nature = "family"
  const mode = "drive"

  // console.log(JSON.stringify(results, null, 2))

  return (
    <TourPlan
      place_id={place_id}
      lat={lat}
      lon={lon}
      nature={nature}
      mode={mode}
    />
  )
}
