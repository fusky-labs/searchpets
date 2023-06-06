import { createClient } from "redis"

const config = useRuntimeConfig()

const client = createClient({
  url: config.REDIS_URL
})

client.connect()

export const checkSocketOpen = () => {
  if (!client.isOpen) {
    client.connect()
  }
}

export default client
