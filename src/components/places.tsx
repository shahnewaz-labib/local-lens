export default function Places({ places }: { places: any }) {
  return (
    <div>
      <p>List of places:</p>
      <div>
        {places &&
          places.map((place: any) => {
            return (
              <div>
                <p>{place.name}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
