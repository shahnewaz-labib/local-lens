import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { z } from "zod"

const placeSchema = z.object({
  place_id: z.string(),
  formatted: z.string(),
  category: z.string(),
  postcode: z.number(),
  street: z.string(),
  lat: z.number(),
  lon: z.number(),
})

async function submitPlace(placeInfo) {
  const place = placeSchema.safeParse(placeInfo)
  if (place.error) {
    return {
      success: false,
      message: "Invalid data",
    }
  }
  const existing = await prisma.place.findFirst({
    where: {
      lat: place.data.lat,
      lon: place.data.lon,
    },
  })
  if (existing) {
    return {
      success: false,
      message: "lat,lon already added",
    }
  }
  await prisma.place.create({
    data: place.data,
  })
  return {
    success: true,
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const submitted = await submitPlace(data)
    if (submitted.success === false) {
      return NextResponse.json(
        { success: false, message: submitted.message },
        { status: 400 },
      )
    }
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "unknown error" }, { status: 500 })
  }
}
