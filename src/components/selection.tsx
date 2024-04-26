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
  onSelectedChange,
}: {
  items: string[]
  placeholder: string
  onSelectedChange: (value) => void
}) {
  const [selectedItem, setSelectedItem] = React.useState("")
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
