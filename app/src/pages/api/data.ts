import type { NextApiRequest, NextApiResponse } from "next"
import { grabData } from "lib/redis"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const data = await grabData()
  return res.send(JSON.stringify(data))
}
