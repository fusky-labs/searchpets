import type { NextApiRequest, NextApiResponse } from "next"
import { grabData } from "lib/redis"
import { resolve } from "path"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const receiveData = (async () => {
    const data = await grabData()
    console.log(data)
    res.send(JSON.stringify(data))
    resolve()
  })()
}

export {}
