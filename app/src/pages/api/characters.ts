import type { NextApiRequest, NextApiResponse } from "next"
import { grabCharacters } from "lib/redis"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const characters = await grabCharacters()
  return res.status(200).send(JSON.stringify(characters))
}
