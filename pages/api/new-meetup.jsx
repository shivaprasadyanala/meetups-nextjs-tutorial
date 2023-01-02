// /api/new-meetup
// POST /api/new-meetup


import { MongoClient } from 'mongodb'

async function handler(req, res) {
 if (req.method === 'POST') {
  const data = req.body;

  const { title, image, address, description } = data;

  const client = new MongoClient('mongodb+srv://shiva:X6J28Fy6v0aNYCmn@cluster0.3vd7ixu.mongodb.net/meetups?retryWrites=true&w=majority')
  //X6J28Fy6v0aNYCmn
  await client.connect()
  const db = client.db('meetups')

  const meetupsCollection = db.collection('meetups')
  const result = await meetupsCollection.insertOne(data)

  console.log(result);
  client.close()

  res.status(201).json({ message: "meetup inserted!" })
 }
}


export default handler;