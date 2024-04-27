"use server"
// import { redis } from "@/config/redis"
import { CohereClient } from "cohere-ai"

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
})

export async function cohereCall(results) {
  const response = await cohere.generate({
    model: "command",
    prompt:
      'You are a helpful travel planner. Arrange the following locations into a comprehensive tour plan. Mention about weather at each place. Use the format :\n\n"Here is a comprehensive tour for your family.\nDay #:\ntour description of attraction 1\nlunch description of food 1\ntour description of attraction 2\ndinner description of food 2"\n\n' +
      JSON.stringify(results, null, 2),
    maxTokens: 300,
    temperature: 0.7,
    k: 0,
    stopSequences: [],
    returnLikelihoods: "NONE",
  })
  console.log(response.generations[0].text)

  return response.generations[0].text
}

export async function getIsochrone(
  lat: number,
  lon: number,
  type: string,
  mode: string,
  range: number,
) {
  const key = `isochrone:${lat}-${lon}-${type}-${mode}-${range}`
  // const cached = await redis.get(key)
  // if (cached) {
  //   return cached
  // }

  const url = `https://api.geoapify.com/v1/isoline?lat=${lat}&lon=${lon}&type=${type}&mode=${mode}&range=${range}&traffic=approximated&max_speed=60&apiKey=${process.env.GEOAPIFY_API_KEY}`
  console.log(url)

  const response = await fetch(url)
  if (!response.ok) return []
  const result = await response.json()
  if (!result) return []

  const ret = result.features.map(function (f: any) {
    return f.properties
  })
  // await redis.set(key, ret)
  return ret
}

export async function searchNearbyIsochrone(
  isochrone_id: string,
  categories?: string,
) {
  if (!categories) {
    categories = "tourism"
  }

  const key = `nearbyIso:${isochrone_id}-${categories}`
  // const cached = await redis.get(key)
  // if (cached) {
  //   return cached
  // }

  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=geometry:${isochrone_id}&limit=20&apiKey=${process.env.GEOAPIFY_API_KEY}`
  const response = await fetch(url)
  if (!response.ok) return []
  const result = await response.json()
  if (!result) {
    return []
  }
  if (!result.features) {
    return []
  }
  const ret = result.features.map(function (f: any) {
    return f.properties
  })
  // await redis.set(key, ret)
  return ret
}

export async function getNextLocation(
  lat: number,
  lon: number,
  mode: string,
  range: number,
  categories?: string,
  visited?: Set<string>,
) {
  const results = await getIsochrone(lat, lon, "time", mode, range)

  const isochrone_id = results[0].id
  const nearby = await searchNearbyIsochrone(isochrone_id, categories)

  const filtered_nearby = nearby.filter((n: any) => n.name)

  const filtered_nearby_unvis = visited
    ? filtered_nearby.filter((n: any) => !visited.has(n.place_id))
    : filtered_nearby
  const random_nearby =
    filtered_nearby_unvis[
      Math.floor(Math.random() * filtered_nearby_unvis.length)
    ]
  return random_nearby
}

export async function getLocationsForOneDay(
  lat: number,
  lon: number,
  nature: string,
  mode: string,
  visited: Set<string>,
) {
  // parameters
  const range = nature === "family" ? 1800 : 3600

  // get attractions
  const attraction1 = await getNextLocation(
    lat,
    lon,
    mode,
    range,
    "tourism",
    visited,
  )

  visited.add(attraction1.place_id)
  const food1 = await getNextLocation(
    attraction1.lat,
    attraction1.lon,
    mode,
    range,
    "catering",
  )
  const attraction2 = await getNextLocation(
    food1.lat,
    food1.lon,
    mode,
    range,
    "tourism",
    visited,
  )

  visited.add(attraction2.place_id)

  const food2 = await getNextLocation(
    attraction2.lat,
    attraction2.lon,
    mode,
    range,
    "catering",
  )

  return {
    attraction1: {
      name: attraction1?.name,
      lat: attraction1?.lat,
      lon: attraction1?.lon,
      city: attraction1?.city,
      country: attraction1?.country,
      categories: attraction1?.categories,
      place_id: attraction1.place_id,
    },
    food1: {
      name: food1?.name,
      lat: food1?.lat,
      lon: food1?.lon,
      city: food1?.city,
      country: food1?.country,
      categories: food1?.categories,
      place_id: food1.place_id,
    },
    attraction2: {
      name: attraction2?.name,
      lat: attraction2?.lat,
      lon: attraction2?.lon,
      city: attraction2?.city,
      country: attraction2?.country,
      categories: attraction2?.categories,
      place_id: attraction2.place_id,
    },
    food2: {
      name: food2?.name,
      lat: food2?.lat,
      lon: food2?.lon,
      city: food2?.city,
      country: food2?.country,
      categories: food2?.categories,
      place_id: food2.place_id,
    },
  }
}
