import type { NextApiRequest, NextApiResponse } from "next"
import { grabCharacters } from "lib/redis"
import { resolve } from "path"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const recieveCharacters = (async () => {
    console.log("api is running")
    const characters = await grabCharacters()
    console.log(characters)
    res.status(200).send(JSON.stringify(characters))
  })()
}

export {}
