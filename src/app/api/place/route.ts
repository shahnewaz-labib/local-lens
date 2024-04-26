import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { z } from "zod"

const placeSchema = z.object({
  place_id: z.string(),
  formatted: z.string(),
  postcode: z.number(),
  street: z.string(),
  lat: z.number(),
  lon: z.number(),
})

export async function submitPlace(placeInfo) {
  const place = placeSchema.safeParse(placeInfo)
  if (place.error) {
    console.log(place.error.toString())
    return false
  }
  return prisma.place.create({
    data: place.data,
  })
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const submitted = await submitPlace(data)
    if (!submitted) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.log(err.message)
    return NextResponse.json({ message: "unknown error" }, { status: 500 })
  }
}
