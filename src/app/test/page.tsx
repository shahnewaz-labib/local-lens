<<<<<<< HEAD
import SearchNearbyAttractions from "@/components/search-nearby-attractions"

export default function Test() {
  return (
    <div>
      <SearchNearbyAttractions />
    </div>
  )
=======
import { searchNearby } from "@/actions/geoapify" ;


export default async function Test() {
    const results = await searchNearby("90.3825171","23.9452074")
    console.log(results)
    return (
        <div>
            <p>Test</p>
        </div>
    )
>>>>>>> e3c0a1b (nearby places action)
}
