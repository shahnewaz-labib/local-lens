import { getWeatherByCity } from "@/actions/weather"
import { useEffect, useState } from "react"
import { Card, CardDescription, CardHeader } from "./ui/card"
import { FaRadiation, FaTemperatureLow } from "react-icons/fa"
import { CiDroplet } from "react-icons/ci"

export default function Weather(city: any) {
  const [weather, setWeather] = useState<any>()

  useEffect(() => {
    getWeatherByCity(city.city)
      .then((data: any) => {
        setWeather(data)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }, [])

  if (!weather || !weather.current || !weather.location) {
    return <div className="m-6 animate-pulse">Gathering Weather Data...</div>
  }

  return (
    <Card className="m-6">
      <CardHeader>
        Weather in
        <code className="text-lg">
          {city.city}, {weather.location.country}
        </code>
      </CardHeader>
      <CardDescription>
        <div className="m-6 flex items-center justify-between gap-2">
          <div>
            <FaTemperatureLow size={30} className="mb-2 ml-2" />{" "}
            {weather.current.temp_c}°C
          </div>
          <div>
            <CiDroplet size={30} className="mb-2 ml-6" />{" "}
            {weather.current.humidity}% Humidity
          </div>
          <div>
            <FaRadiation size={30} className="mb-2 ml-2" />{" "}
            {weather.current.air_quality.pm2_5 * 10} AQI
          </div>
        </div>
      </CardDescription>
    </Card>
  )
}
