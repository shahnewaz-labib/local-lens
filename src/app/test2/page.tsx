"use client"
import React, { useEffect, useState } from 'react';
import { searchNearby, searchNearbyWithinCity } from '@/actions/geoapify';
export default function Test() {

  const [attraction, setAttraction] = useState([]);
  useEffect(() => {
    searchNearbyWithinCity("90.34686535627966", "23.81864335",    "516c2a4c40cf9956405938872a3fa9c83740f00101f901d17dd00000000000c0020892031fe0a6a2e0a6bee0a695e0a6be20e0a6aee0a6b9e0a6bee0a6a8e0a697e0a6b0")
      .then((result) => {
        console.log("result");
        setAttraction(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  
  return (
    <div>
      <h1>Test 2</h1>
      {attraction.map((attraction) => (
        <div key={attraction.place_id}>
          {attraction.name}
        </div>
      ))}
    </div>
  )
}
