"use server"

export async function searchNearby(lat:string, lon:string) {
    var requestOptions = {
        method: 'GET',
    };
    console.log(process.env.GEOAPIFY_API_KEY)
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.information,tourism.attraction&filter=circle:${lat},${lon},50000&bias=proximity:${lat},${lon}&limit=20&apiKey=`+process.env.GEOAPIFY_API_KEY, requestOptions)
    const result = await response.json()
    const var1 = result.features.map(function(f:any){return f.properties}) 
    console.log(var1)
    return var1
}




