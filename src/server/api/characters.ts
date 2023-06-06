import client, { checkSocketOpen } from "~/utils/redis"

export default defineEventHandler(async (event) => {
  checkSocketOpen()

  const { slug } = getQuery(event)

  const characters = slug
    ? client.hGet("characters_list", slug.toString())
    : client.hGetAll("characters_list")

  return characters
})
