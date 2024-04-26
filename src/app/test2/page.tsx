import { searchNearby } from "@/actions/geoapify"
import { getWeather } from "@/actions/weather"
import { getLocationsForOneDay } from "@/actions/tour-plan"

export default async function Test() {
  // parameters
  const lat = 23.8
  const lon = 90.65
  const nature = "family"
  const mode = "drive"

  const accommodation =
    nature === "family"
      ? "accommodation.hotel,accommodation.hut,accommodation.chalet,accommodation.apartment,accommodation.guest_house"
      : "accommodation.hotel,accommodation.motel"

  // get accommodation
  const accommodation_location = await searchNearby(
    lat,
    lon,
    accommodation,
    100,
  )
  const random_accommodation =
    accommodation_location[
      Math.floor(Math.random() * accommodation_location.length)
    ]

  // get locations for one day
  var visited = new Set<string>()
  const locations1 = await getLocationsForOneDay(
    random_accommodation.lat,
    random_accommodation.lon,
    nature,
    mode,
    visited,
  )

  visited.add(locations1.attraction1.place_id)
  visited.add(locations1.attraction2.place_id)

  // get locations for second day
  const locations2 = await getLocationsForOneDay(
    random_accommodation.lat,
    random_accommodation.lon,
    nature,
    mode,
    visited,
  )

  visited.add(locations2.attraction1.place_id)
  visited.add(locations2.attraction2.place_id)

  // get locations for third day
  const locations3 = await getLocationsForOneDay(
    random_accommodation.lat,
    random_accommodation.lon,
    nature,
    mode,
    visited,
  )
  visited.add(locations3.attraction1.place_id)
  visited.add(locations3.attraction2.place_id)

  // get weather forecast
  const weatherForecast = await getWeather(lat, lon)

  const results = {
    locations: {
      accommodation: random_accommodation,
      day1: locations1,
      day2: locations2,
      day3: locations3,
    },
    weather_forcast: {
      day1: {
        max_temp: weatherForecast.forecast.forecastday[0].day.maxtemp_c,
        min_temp: weatherForecast.forecast.forecastday[0].day.mintemp_c,
        chance_of_rain:
          weatherForecast.forecast.forecastday[0].day.daily_chance_of_rain,
        aqi: weatherForecast.forecast.forecastday[0].day.air_quality.pm2_5 * 10,
      },
      day2: {
        max_temp: weatherForecast.forecast.forecastday[1].day.maxtemp_c,
        min_temp: weatherForecast.forecast.forecastday[1].day.mintemp_c,
        chance_of_rain:
          weatherForecast.forecast.forecastday[1].day.daily_chance_of_rain,
        aqi: weatherForecast.forecast.forecastday[1].day.air_quality.pm2_5 * 10,
      },
      day3: {
        max_temp: weatherForecast.forecast.forecastday[2].day.maxtemp_c,
        min_temp: weatherForecast.forecast.forecastday[2].day.mintemp_c,
        chance_of_rain:
          weatherForecast.forecast.forecastday[2].day.daily_chance_of_rain,
        aqi: weatherForecast.forecast.forecastday[2].day.air_quality.pm2_5 * 10,
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Tour Plan</h1>
      {/* <p className="text-lg">
        1. Book your stay at {random_accommodation?.name}.
      </p>
      <p className="text-lg">2. Visit {attraction1?.name}.</p>
      <p className="text-lg">3. Have lunch at {food1?.name}.</p>
      <p className="text-lg">4. Visit {attraction2?.name}.</p>
      <p className="text-lg">5. Have dinner at {food2?.name}.</p>
      <p className="text-lg">
        6. Have a good night sleep at {random_accommodation?.name}. 
      </p> */}
    </div>
  )
}
