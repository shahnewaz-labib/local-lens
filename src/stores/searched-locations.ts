import { atom } from "jotai"

export const locationsAtom = atom<any[]>([])
export const locationForWeatherAtom = atom<{ lat: number; lon: number }>({
  lat: 0,
  lon: 0,
})
