'use client'

import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

export default function Test() {

  const map = L.map('my-map').setView([48.1500327, 11.5753989], 10);
  const isRetina = L.Browser.retina;
  const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
  const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";
  L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: process.env.GEOAPIFY_API_KEY, 
      maxZoom: 20, 
      id: 'osm-bright'
  }).addTo(map);
  
  
  
  return (
    <div>
      <h1>Test 2</h1>
      <Image src={image} alt="Vercel Logo" width={720} height={720} />
    </div>
  )
}
