"use client"
import { Combobox } from "@/components/combobox"
const suggestions = [{ formatted: "Accomodation" }, { formatted: "Education" }]

export default function Test() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Combobox
        suggestions={suggestions}
        onSelectedChange={(value: string) => {
          const index = suggestions.findIndex(
            (item) => item.formatted === value,
          )
          console.log(`value;;;;;;;;;${value} and ${index}`)
        }}
      />
    </div>
  )
}
