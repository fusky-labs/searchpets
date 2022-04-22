import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const receiveData = async () => {
    const response = await fetch('http://localhost:5000/data')
    const json = await response.json()
    res.end(JSON.stringify(json))
    resolve()
  }
  receiveData()
}
