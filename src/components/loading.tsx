import { cn } from "@/lib/utils"

export default function Loading({
  className,
  text = "Loading Result...",
}: {
  text?: string
  className?: string
}) {
  return <p className={cn("animate-pulse m-4", className)}>{text}</p>
}
