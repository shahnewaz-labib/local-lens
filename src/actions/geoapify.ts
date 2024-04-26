"use server"

const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function searchNearby(lat: string, lon: string) {
  const requestOptions = {
    method: "GET",
  }
  console.log(process.env.GEOAPIFY_API_KEY)
  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=tourism.information,tourism.attraction&filter=circle:${lat},${lon},50000&bias=proximity:${lat},${lon}&limit=20&apiKey=` +
      process.env.GEOAPIFY_API_KEY,
    requestOptions,
  )
  const result = await response.json()
  return result.features.map(function (f: any) {
    return f.properties
  })
}

export async function searchNearbyWithinCity(
  place_id: string,
  categories?: string,
) {
  if (!categories) {
    categories = "tourism.attraction"
  }
  console.log(categories)
  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=${categories}&filter=place:${place_id}&limit=20&apiKey=${geoApiFiKey}`,
  )

  const result = await response.json()
  if (!result) return []
  return result.features.map(function (f: any) {
    return f.properties
  })
}
