import { createClient } from "redis"

const config = useRuntimeConfig()

const Client = createClient({
  url: config.REDIS_URL
})

Client.connect()

export default Client
