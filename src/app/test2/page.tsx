import { searchNearby } from "@/actions/geoapify"
import { getWeather } from "@/actions/weather"
import { getLocationsForOneDay } from "@/actions/tour-plan"

import TourPlan from "@/components/tourplan"

export default async function Test() {
  // parameters
  const place_id =
    "51fe84b7f8689a564059ce302d3e4fca3740f00102f901bd59d3150000000092030b416d617269204468616b61"
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
    place_id,
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
  // console.log(JSON.stringify(results, null, 2))

  return <TourPlan plan={results} />
}
