import { createClient } from "redis"

const Client = createClient({
  url: process.env.REDIS_URL
})

export default Client
