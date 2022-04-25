import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const sendData = (async () => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })
    const json = await response.json()
    res.status(200).json(json)
    resolve()
  })()
}
