"use server"

import { redis } from "@/config/redis"

const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function getLocations(locationString: string) {
  if (!locationString || locationString.length === 0) return []
  const key = `locations-${locationString}`
  const cached = await redis.get(key)
  if (cached) {
    return cached
  }
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${locationString}&format=json&apiKey=${geoApiFiKey}`,
  )
  if (!res.ok) {
    return []
  }
  const data = await res.json()
  await redis.set(key, data.results)
  return data.results
}
