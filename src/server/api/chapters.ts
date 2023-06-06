import client, { checkSocketOpen } from "~/utils/redis"

export default defineEventHandler(async (event) => {
  checkSocketOpen()

  const { slug } = getQuery(event)

  const chapters = slug
    ? client.hGet("chapter_list", slug.toString())
    : client.hGetAll("chapter_list")

  return chapters
})
