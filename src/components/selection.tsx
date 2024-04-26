import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Selection({
  items,
  placeholder,
  selectedItem,
  setSelectedItem,
}: {
  items: string[]
  placeholder: string
  selectedItem: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}) {
  const handleSelectChange = (value: string) => {
    setSelectedItem(value)
  }

  return (
    <Select value={selectedItem} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
