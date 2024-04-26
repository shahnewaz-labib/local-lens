"use client"
import React, { useEffect, useState } from 'react';
import { searchNearby } from '@/actions/geoapify';
export default function Test() {

  const [attraction, setAttraction] = useState([]);
  useEffect(() => {
    searchNearby("90.3825171","23.9452074")
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
