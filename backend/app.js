import express from 'express'
import cors from 'cors'
import giftRoutes from './giftRoutes.js'
import searchRoutes from './searchRoutes.js'
import authRoutes from './authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.get('/api/health', (request, response) => response.json({ status: 'ok', service: 'GiftLink API' }))
app.use('/api/gifts', giftRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/auth', authRoutes)

export default app