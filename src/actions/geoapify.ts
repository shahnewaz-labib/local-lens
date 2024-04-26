"use server"

import { redis } from "@/config/redis"

const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function searchNearby(
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
  const cached = await redis.get(key)
  if (cached) {
    return cached
  }

  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${geoApiFiKey}`,
  )
  const result = await response.json()
  if (!result) return []
  const ret = result.features.map(function (f: any) {
    return f.properties
  })

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

  const result = await response.json()
  if (!result) return []
  const ret = result.features.map(function (f: any) {
    return f.properties
  })

  await redis.set(key, ret)
  return ret
}
