const aqiApiKey = process.env.NEXT_PUBLIC_AQI_API_KEY

export async function getWeather(lat: number, lon: number) {
  const forcastDays = 3
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${aqiApiKey}&q=${lat},${lon}&days=${forcastDays}&aqi=yes&alerts=yes`
  const response = await fetch(url)

  const result = await response.json()
  return result
}

export async function getWeatherByCity(city: string) {
  const forcastDays = 3
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${aqiApiKey}&q=${city}&days=${forcastDays}&aqi=yes&alerts=yes`
  const response = await fetch(url)

  const result = await response.json()
  return result
}
