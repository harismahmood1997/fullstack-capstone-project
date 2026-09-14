import { Router } from 'express'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from './db.js'

const router = Router()

function getUserId(request) {
  const header = request.headers.authorization || ''
  if (!process.env.JWT_SECRET || !header.startsWith('Bearer ')) return null
  try {
    return jwt.verify(header.slice(7), process.env.JWT_SECRET).userId
  } catch (error) {
    return null
  }
}

router.get('/', async (request, response) => {
  try {
    const database = await connectToDatabase()
    const gifts = await database.collection('gifts').find({}).sort({ id: 1 }).toArray()
    response.json(gifts)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load gifts' })
  }
})

router.post('/', async (request, response) => {
  const userId = getUserId(request)
  if (!userId) return response.status(401).json({ error: 'Login is required to add a gift' })

  const { name, description, category, image, location } = request.body
  if (!name || !description || !category) return response.status(400).json({ error: 'Name, description, and category are required' })

  try {
    const database = await connectToDatabase()
    const user = await database.collection('users').findOne({ _id: new ObjectId(userId) })
    const gift = { id: Date.now(), name, description, category, image: image || '', location: location || '', userId, postedBy: user?.name || 'GiftLink user', createdAt: new Date() }
    await database.collection('gifts').insertOne(gift)
    response.status(201).json(gift)
  } catch (error) {
    response.status(500).json({ error: 'Unable to create gift' })
  }
})

router.post('/:id/comments', async (request, response) => {
  const userId = getUserId(request)
  if (!userId) return response.status(401).json({ error: 'Login is required to comment' })
  if (!request.body.comment?.trim()) return response.status(400).json({ error: 'Comment is required' })

  try {
    const database = await connectToDatabase()
    const comment = { giftId: request.params.id, userId, comment: request.body.comment.trim(), createdAt: new Date() }
    await database.collection('comments').insertOne(comment)
    response.status(201).json(comment)
  } catch (error) {
    response.status(500).json({ error: 'Unable to add comment' })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const database = await connectToDatabase()
    const id = Number(request.params.id)
    const query = Number.isNaN(id) && ObjectId.isValid(request.params.id)
      ? { _id: new ObjectId(request.params.id) }
      : { id }
    const gift = await database.collection('gifts').findOne(query)
    if (!gift) return response.status(404).json({ error: 'Gift not found' })
    const comments = await database.collection('comments').find({ giftId: request.params.id }).sort({ createdAt: -1 }).toArray()
    response.json({ ...gift, comments })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load gift' })
  }
})

export default router