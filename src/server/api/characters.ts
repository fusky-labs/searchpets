import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!Client.isOpen) Client.connect()

  const { slug } = getQuery(event)

  const characters = slug
    ? Client.hGet("characters_list", slug.toString())
    : Client.hGetAll("characters_list")

  return characters
})
