"use server"

const geoApiFiKey = process.env.GEOAPIFY_API_KEY!

export async function getLocations(locationString: string) {
  console.log("api key", geoApiFiKey)
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${locationString}&format=json&apiKey=${geoApiFiKey}`,
  )
  const data = await res.json()
  return data.results
}
