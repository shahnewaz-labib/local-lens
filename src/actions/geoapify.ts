"use server"

export async function searchNearby(lat:string, lon:string) {
    var requestOptions = {
        method: 'GET',
    };
    console.log(process.env.GEOAPIFY_API_KEY)
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.information,tourism.attraction&filter=circle:${lat},${lon},50000&bias=proximity:${lat},${lon}&limit=20&apiKey=`+process.env.GEOAPIFY_API_KEY, requestOptions)
    const result = await response.json()
    return result.features.map(function(f:any){return f.properties}) 
}

export async function searchNearbyWithinCity(lat:string, lon:string, place_id:string) {
    var requestOptions = {
        method: 'GET',
    };
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:${place_id}&bias=proximity:${lat},${lon}&limit=20&apiKey=`+process.env.GEOAPIFY_API_KEY, requestOptions)

    const result = await response.json()
    return result.features.map(function(f:any){return f.properties})
}

