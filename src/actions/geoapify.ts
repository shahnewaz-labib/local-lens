export async function searchNearby(lat:string, lon:string) {
    var requestOptions = {
        method: 'GET',
    };
    console.log(process.env.GEOAPIFY_API_KEY)
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.information,tourism.attraction&filter=circle:${lat},${lon},50000&bias=proximity:${lat},${lon}&limit=20&apiKey=`+process.env.GEOAPIFY_API_KEY, requestOptions)
    const result = await response.json()
    return result.features.map(function(f:any){return f.properties}) 
}

export function searchInCity(city:string) {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=`+process
    .env.GEOAPIFY_API_KEY)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


