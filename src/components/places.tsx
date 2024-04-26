import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export default function Places({ places }: { places: any }) {
  console.log(places)
  return (
    <div>
      <p>List of places:</p>
      <div>
        {places &&
          places.map((place: any) => {
            if (!place.name) return <div></div>
            return (
              <Card>
                <CardHeader>
                  <h2>{place.name}</h2>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>{place.address_line2}</CardFooter>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
