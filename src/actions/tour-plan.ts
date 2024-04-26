const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function getIsochrone(
  lat: number,
  lon: number,
  type: "time" | "distance",
  mode: "drive" | "bus" | "motorcycle" | "bicycle" | "walk" | "transit",
  range: number,
) {
  const response = await fetch(
    `https://api.geoapify.com/v1/isoline?lat=${lat}&lon=${lon}&type=${type}&mode=${mode}&range=${range}&traffic=approximated&max_speed=60&apiKey=${geoApiFiKey}`,
  )
  const result = await response.json()
  if (!result) return []
  const ret = result.features.map(function (f: any) {
    return f.properties
  })

  return ret
}

export async function searchNearbyIsochrone(
  isochrone_id: string,
  categories?: string,
) {
  if (!categories) {
    categories = "tourism"
  }
  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=geometry:${isochrone_id}&limit=20&apiKey=${geoApiFiKey}`
  const response = await fetch(url)

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
  return ret
}
