import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Selection({
  items,
  onSelectedChange,
  placeholder,
  selectedItem,
  setSelectedItem,
}: {
  items: string[]
  onSelectedChange: (value: string) => void
  placeholder: string
  selectedItem: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}) {
  const handleSelectChange = (value: string) => {
    setSelectedItem(value)
    onSelectedChange(value)
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
