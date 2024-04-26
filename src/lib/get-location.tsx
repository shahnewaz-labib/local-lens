export function getlatlon(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.watchPosition(
        // Success callback function
        function (position) {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          // Resolve the promise with the latitude and longitude
          resolve({ lat, lng })
        },
        // Error callback function
        function (error) {
          // Handle errors, e.g. user denied location sharing permissions
          reject("Error getting user location: " + error.message)
        },
      )
    } else {
      // Geolocation is not supported by the browser
      reject("Geolocation is not supported by this browser.")
    }
  })
}
