import client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!client.isOpen) client.connect()

  const { slug } = getQuery(event)

  const characters = slug
    ? client.hGet("characters_list", slug.toString())
    : client.hGetAll("characters_list")

  return characters
})
