"use client"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

import { MapPin } from "lucide-react"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRef, useState } from "react"
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl"
import styles from "./styles.module.css"

export default function MapComponent({
  lat,
  lon,
  places,
}: {
  lat: string
  lon: string
  places: any
}) {
  if (!lat || !lon) {
    return <p>lat, lon not provided in search param</p>
  }
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const mapRef = useRef(null)
  const zoomToSelectedLoc = (e: any, location: any, index: number) => {
    e.stopPropagation()
    setSelectedMarker(location)
    if (!mapRef?.current) return
    //@ts-ignore
    mapRef.current.flyTo({ center: [location.lon, location.lat], zoom: 15 })
  }

  return (
    <main className={styles.mainStyle}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        cursor="default"
        initialViewState={{
          latitude: Number(lat),
          longitude: Number(lon),
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {places.map((place: any, index: number) => {
          return (
            <Marker key={index} longitude={place.lon} latitude={place.lat}>
              <button
                type="button"
                className="cursor-pointer text-red-500"
                onClick={(e) => zoomToSelectedLoc(e, place, index)}
              >
                <MapPin />
              </button>
            </Marker>
          )
        })}
        {selectedMarker ? (
          <Popup
            offset={25}
            latitude={selectedMarker.lat}
            longitude={selectedMarker.lon}
            onClose={() => {
              setSelectedMarker(null)
            }}
            closeButton={false}
            className="text-background"
          >
            <p className="capitalize">
              {selectedMarker.datasource.raw.amenity}
            </p>
            <p className="text-green-500">{selectedMarker.name}</p>
            <div className="font-xs">
              <p>Street: {selectedMarker.street}</p>
              <p>Postcode: {selectedMarker.postcode}</p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </main>
  )
}
