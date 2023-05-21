import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  await Client.connect()
  const characters = await Client.sMembers("chapter_db")
  return characters.sort()
})
