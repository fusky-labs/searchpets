import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // receive the data from the flask server using fetch and async/awaits
  const receiveData = async () => {
    const response = await fetch('http://localhost:5000/data')
    const json = await response.json()
    res.status(200).json(json)
  }
  receiveData()
}
