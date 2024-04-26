import { getIsochrone, searchNearbyIsochrone } from "@/actions/tour-plan"
import { searchNearby } from "@/actions/geoapify"
import { getWeather } from "@/actions/weather"

async function getNextLocation(
  lat: number,
  lon: number,
  mode: "drive" | "bus" | "motorcycle" | "bicycle" | "walk" | "transit",
  range: number,
  categories?: string,
) {
  const results = await getIsochrone(lat, lon, "time", mode, range)
  const isochrone_id = results[0].id
  const nearby = await searchNearbyIsochrone(isochrone_id, categories)
  const filtered_nearby = nearby.filter((n: any) => n.name)

  const random_nearby =
    filtered_nearby[Math.floor(Math.random() * filtered_nearby.length)]
  return random_nearby
}

export default async function Test() {
  // const tour_1 = await getNextLocation(24.1510064, 90.7084063, 3600, "tourism")
  // const food_1 = await getNextLocation(tour_1.lat, tour_1.lon, 3600, "catering")
  // const tour_2 = await getNextLocation(food_1.lat, food_1.lon, 3600, "tourism")
  // const food_2 = await getNextLocation(tour_2.lat, tour_2.lon, 3600, "catering")
  // const sleep = await getNextLocation(
  //   food_2.lat,
  //   food_2.lon,
  //   3600,
  //   "accommodation.hotel,accomodation.guest_house",
  // )

  // parameters
  const lat = 23.8
  const lon = 90.65
  const nature = "family"
  const mode = "drive"

  // get accommodation
  const accommodation =
    nature === "family"
      ? "accommodation.hotel,accommodation.hut,accommodation.chalet,accommodation.apartment,accommodation.guest_house"
      : "accommodation.hotel,accommodation.motel"
  const range = nature === "family" ? 1800 : 3600

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

  // const accomodation_location = await getNextLocation(
  //   lat,
  //   lon,
  //   mode,
  //   range,
  //   accommodation,
  // )

  const attraction1 = await getNextLocation(lat, lon, mode, range, "tourism")
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
  )
  const food2 = await getNextLocation(
    attraction2.lat,
    attraction2.lon,
    mode,
    range,
    "catering",
  )

  const weather = await getWeather(lat, lon)
  const weatherForecast = {
    today: {
      maxTemp: weather.forecast.forecastday[0].day.maxtemp_c,
      minTemp: weather.forecast.forecastday[0].day.mintemp_c,
      chanceOfRain: weather.forecast.forecastday[0].day.daily_chance_of_rain,
      aqi: weather.forecast.forecastday[0].hour[0].air_quality.pm2_5 * 10,
    },
    tomorrow: {
      maxTemp: weather.forecast.forecastday[1].day.maxtemp_c,
      minTemp: weather.forecast.forecastday[1].day.mintemp_c,
      chanceOfRain: weather.forecast.forecastday[1].day.daily_chance_of_rain,
      aqi: weather.forecast.forecastday[1].hour[0].air_quality.pm2_5 * 10,
    },
    dayAfterTomorrow: {
      maxTemp: weather.forecast.forecastday[2].day.maxtemp_c,
      minTemp: weather.forecast.forecastday[2].day.mintemp_c,
      chanceOfRain: weather.forecast.forecastday[2].day.daily_chance_of_rain,
      aqi: weather.forecast.forecastday[2].hour[0].air_quality.pm2_5 * 10,
    },
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Tour Plan</h1>
      <p className="text-lg">
        1. Book your stay at {random_accommodation?.name}.
      </p>
      <p className="text-lg">2. Visit {attraction1?.name}.</p>
      <p className="text-lg">3. Have lunch at {food1?.name}.</p>
      <p className="text-lg">4. Visit {attraction2?.name}.</p>
      <p className="text-lg">5. Have dinner at {food2?.name}.</p>
      <p className="text-lg">
        6. Have a good night sleep at {random_accommodation?.name}.
      </p>
    </div>
  )
}
