import { Router } from 'express'
import { connectToDatabase } from './db.js'

const router = Router()

router.get('/', async (request, response) => {
  try {
    const database = await connectToDatabase()
    const query = request.query.category ? { category: request.query.category } : {}
    const gifts = await database.collection('gifts').find(query).sort({ id: 1 }).toArray()
    response.json(gifts)
  } catch (error) {
    response.status(500).json({ error: 'Unable to search gifts' })
  }
})

export default router