"use server"

import { redis } from "@/config/redis"
import prisma from "@/lib/db"

const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function searchNearby(
  place_id: string,
  lat: number,
  lon: number,
  categories: string,
  radius?: number,
) {
  if (!radius) {
    radius = 10
  }
  radius = Math.round(radius * 1000)
  const key = `nearby:${lat}-${lon}-${categories}-${radius}`
  /* const cached = await redis.get(key) */
  /* if (cached) { */
  /*   return cached */
  /* } */
  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${geoApiFiKey}`
  const response = await fetch(url)
  if (!response.ok) return []
  const result = await response.json()

  if (!result) return []
  let ret = result.features.map(function (f: any) {
    return f.properties
  })

  const placesFromCommunityData = await prisma.place.findMany({
    where: {
      place_id,
    },
  })

  if (placesFromCommunityData) {
    ret = ret.concat(placesFromCommunityData)
  }

  await redis.set(key, ret)
  return ret
}

export async function searchNearbyWithinCity(
  place_id: string,
  categories?: string,
) {
  if (!categories) {
    categories = "tourism.attraction"
  }
  const key = `city-nearby:${place_id}-${categories}`
  const cached = await redis.get(key)
  if (cached) {
    return cached
  }

  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${place_id}&limit=20&apiKey=${geoApiFiKey}`,
  )
  if (!response.ok) return []
  const result = await response.json()
  if (!result) return []
  let ret = result.features.map(function (f: any) {
    return f.properties
  })

  const placesFromCommunityData = await prisma.place.findMany({
    where: {
      place_id,
    },
  })

  if (placesFromCommunityData) {
    ret = ret.concat(placesFromCommunityData)
  }

  await redis.set(key, ret)
  return ret
}
