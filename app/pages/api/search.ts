import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // send the data to the flask server using fetch and async/awaits
  const sendData = async () => {
    const response = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })
    const json = await response.json()
    res.status(200).json(json)
  }
  sendData()
}
