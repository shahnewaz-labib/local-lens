import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export default function Places({ places }: { places: any }) {
  console.log(places)
  return (
    <div className="m-2 w-1/2">
      <p className="m-2 ml-6">List of places:</p>
      <div className="m-2">
        {places &&
          places.map((place: any, index: number) => {
            if (!place.name) return <div key={index}></div>
            return (
              <Card className="m-4 hover:scale-105 transition-transform duration-200" key={index}>
                <CardHeader>
                  <h2 className="font-bold">{place.name}</h2>
                </CardHeader>
                <CardContent>TODO: Some Description</CardContent>
                <CardFooter className="text-sm text-gray-500">
                  {place.address_line2}
                </CardFooter>
                <CardFooter className="italic text-sm text-gray-500">
                  Category: {place.categories[0]}
                </CardFooter>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
