import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.upstashUrl!,
  token: process.env.upstashKey!,
})
