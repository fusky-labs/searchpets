import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  await Client.connect()
  const characters = await Client.sMembers("characters_db")
  return characters.sort()
})
