import { createClient } from "redis"

const config = useRuntimeConfig()

const Client = createClient({
  url: config.REDIS_URL
})

export default Client
