import Client from "~/utils/redis"

export default defineEventHandler(async (event) => {
  if (!Client.isOpen) Client.connect()

  const characters = await Client.sMembers("characters_list")
  return characters.sort()
})
