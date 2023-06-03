import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!Client.isOpen) Client.connect()

  const chapters = await Client.sMembers("chapter_list")
  return chapters.sort()
})
