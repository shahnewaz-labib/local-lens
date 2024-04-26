import { atomWithStorage } from "jotai/utils"

export const userLocationAtom = atomWithStorage("user-location", {
  lat: -1,
  lng: -1,
})
