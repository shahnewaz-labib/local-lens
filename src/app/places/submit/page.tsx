"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getLocations } from "@/actions/location-auto-complete"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Search } from "lucide-react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  formatted: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  street: z
    .string()
    .min(5, { message: "Street must be at least 5 characters" }),
  postcode: z.coerce.number(),
  lat: z.coerce
    .number()
    .max(90, { message: "latitude must be between 90 and -90" })
    .min(-90, { message: "latitude must be between 90 and -90" }),
  lon: z.coerce
    .number()
    .max(180, { message: "longitude must be between 180 and -180" })
    .min(-180, { message: "longitude must be between 180 and -180" }),
  category: z.string().min(3, "Category must be at least 3 characters"),
})

export default function Page() {
  const [city, setCity] = useState("")
  const [locations, setLocations] = useState<any>()
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1)
  const [cityLoading, setCityLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const onCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCityLoading(true)
    const locations = await getLocations(city)
    setSelectedLocationIndex(-1)
    setLocations(locations)
    setCityLoading(false)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formatted: "",
      street: "",
      category: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const placeInfo = {
      ...values,
      place_id: locations[selectedLocationIndex].place_id,
    }

    fetch("/api/place", {
      method: "POST",
      body: JSON.stringify(placeInfo),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success === false) {
          toast({
            description: "Failed to added place, " + data.message,
            variant: "destructive",
          })
        }
        toast({ description: "Successfully added place" })
        router.push("/")
      })
      .catch(() => {
        toast({
          description: "Failed to add place",
          variant: "destructive",
        })
      })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      {locations && selectedLocationIndex >= 0 && (
        <p>City: {locations[selectedLocationIndex].formatted}</p>
      )}
      {selectedLocationIndex === -1 && (
        <div className="flex flex-col gap-2">
          <p>Select the city that the place belongs to</p>
          <div className="relative">
            <form onSubmit={onCitySubmit} className="flex gap-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={city}
                onChange={(e) => {
                  setCity(e.currentTarget.value)
                }}
                placeholder="Enter city name or lat,lon"
                className="pl-8 sm:w-[300px] md:w-[500px]"
              />
              <Button type="submit">
                <FaSearch className="mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>
      )}
      {cityLoading && (
        <p className="mx-auto animate-pulse">Loading Result...</p>
      )}
      {locations && selectedLocationIndex == -1 && (
        <div className="flex flex-col gap-2">
          <p>Select a city:</p>
          <div className="flex flex-col gap-2">
            {locations.map((city: any, ind: number) => {
              return (
                <button
                  key={ind}
                  className="flex w-min bg-primary-foreground px-2"
                  onClick={() => {
                    setSelectedLocationIndex(ind)
                    setCity(city.formatted)
                  }}
                >
                  <p className="w-[300px] px-4 py-2 md:w-[600px]">
                    {city.formatted}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {selectedLocationIndex !== -1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="formatted"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lon"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
