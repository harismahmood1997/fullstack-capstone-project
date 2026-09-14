import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from './db.js'

const router = Router()

function createToken(user) {
  return jwt.sign({ userId: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function getToken(request) {
  const header = request.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : null
}

router.post('/register', async (request, response) => {
  const { name, email, password } = request.body
  if (!name || !email || !password) return response.status(400).json({ error: 'Name, email, and password are required' })
  try {
    const database = await connectToDatabase()
    const users = database.collection('users')
    const normalizedEmail = email.toLowerCase().trim()
    if (await users.findOne({ email: normalizedEmail })) return response.status(409).json({ error: 'Email is already registered' })
    const user = { name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 10), location: '', createdAt: new Date() }
    const result = await users.insertOne(user)
    response.status(201).json({ user: { id: result.insertedId, name: user.name, email: user.email, location: user.location } })
  } catch (error) {
    response.status(500).json({ error: 'Unable to register user' })
  }
})

router.post('/login', async (request, response) => {
  const { email, password } = request.body
  try {
    if (!process.env.JWT_SECRET) return response.status(500).json({ error: 'JWT_SECRET is not configured' })
    const database = await connectToDatabase()
    const user = await database.collection('users').findOne({ email: email.toLowerCase().trim() })
    if (!user || !(await bcrypt.compare(password, user.password))) return response.status(401).json({ error: 'Invalid email or password' })
    response.json({ token: createToken(user), user: { id: user._id, name: user.name, email: user.email, location: user.location } })
  } catch (error) {
    response.status(500).json({ error: 'Unable to log in' })
  }
})

router.put('/user', async (request, response) => {
  const token = getToken(request)
  if (!token) return response.status(401).json({ error: 'Authorization token is required' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const updates = {}
    for (const field of ['name', 'email', 'location']) {
      if (request.body[field] !== undefined) updates[field] = request.body[field]
    }
    const database = await connectToDatabase()
    const result = await database.collection('users').findOneAndUpdate(
      { _id: new ObjectId(payload.userId) },
      { $set: updates },
      { returnDocument: 'after', projection: { password: 0 } },
    )
    response.json(result.value || result)
  } catch (error) {
    response.status(401).json({ error: 'Invalid authorization token' })
  }
})

export default router