import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!Client.isOpen) Client.connect()

  const { slug } = getQuery(event)

  const chapters = slug
    ? Client.hGet("chapter_list", slug.toString())
    : Client.hGetAll("chapter_list")

  return chapters
})
