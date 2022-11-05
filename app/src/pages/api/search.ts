import { searchComics } from "@/lib/redis"
import type { NextApiRequest, NextApiResponse } from "next"
import { resolve } from "path"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  let comics = await searchComics(req.body.year, req.body.characters)
  // console.log(comics)
  return res.status(200).send(JSON.stringify(comics))
}
