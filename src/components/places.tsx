import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export default function Places({ places }: { places: any }) {
  return (
    <div className="m-2 w-1/2">
      <p className="m-2 ml-6">List of places:</p>
      <div className="m-2">
        {places &&
          places.map((place: any, index: number) => {
            return (
              <Card
                className="m-4 transition-transform duration-200 hover:scale-105"
                key={index}
              >
                <CardHeader>
                  <h2 className="font-bold">{place.name || place.formatted}</h2>
                </CardHeader>
                <CardContent>
                  <p>Street: {place.street}</p>
                  <p>Postcode: {place.postcode}</p>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  {place.address_line2 || ""}
                </CardFooter>
                <CardFooter className="text-sm italic text-gray-500">
                  Category:{" "}
                  {(place.categories &&
                    place.categories.length > 0 &&
                    place.categories[0]) ||
                    "community added"}
                </CardFooter>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
