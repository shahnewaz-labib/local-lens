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
import {
  FaDumbbell,
  FaFutbol,
  FaGraduationCap,
  FaHotel,
  FaMosque,
  FaPlaneDeparture,
  FaUtensils,
} from "react-icons/fa"
import { IoLocationSharp } from "react-icons/io5"

export function MapPinIcon({ place }: { place: any }) {
  const faFontSize = 30
  if (place.categories.includes("airport")) {
    return <FaPlaneDeparture size={faFontSize} className="text-blue-500" />
  } else if (place.categories.includes("catering")) {
    return <FaUtensils size={faFontSize} />
  } else if (place.categories.includes("accommodation")) {
    return <FaHotel size={faFontSize} className="text-lime-600" />
  } else if (place.categories.includes("education")) {
    return <FaGraduationCap size={faFontSize} className="text-gray-500" />
  } else if (place.categories.includes("sport.fitness")) {
    return <FaDumbbell size={faFontSize} className="text-blue-900" />
  } else if (place.categories.includes("sport")) {
    return <FaFutbol size={faFontSize} className="text-purple-900" />
  } else if (place.categories.includes("religion.place_of_worship.islam")) {
    return <FaMosque size={faFontSize} className="text-teal-900" />
  }
  return <IoLocationSharp size={30} />
  // TODO: more custom fonts can be added
}

export default function MapComponent({
  lat,
  lon,
  places,
}: {
  lat: string
  lon: string
  places: any
}) {
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
                <MapPinIcon place={place} />
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
