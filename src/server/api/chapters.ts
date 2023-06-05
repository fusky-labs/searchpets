import client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!client.isOpen) client.connect()

  const { slug } = getQuery(event)

  const chapters = slug
    ? client.hGet("chapter_list", slug.toString())
    : client.hGetAll("chapter_list")

  return chapters
})
