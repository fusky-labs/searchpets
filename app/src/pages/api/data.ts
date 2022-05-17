import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const receiveData = (async () => {
    const response = await fetch('http://localhost:5000/data')
    const json = await response.json()
    res.end(JSON.stringify(json))
    resolve()
  })()
  
}
