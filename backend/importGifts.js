import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectToDatabase } from './db.js'

const folder = path.dirname(fileURLToPath(import.meta.url))
const gifts = JSON.parse(await fs.readFile(path.join(folder, 'data', 'gifts.json'), 'utf8'))
const database = await connectToDatabase()
const collection = database.collection('gifts')

await Promise.all(gifts.map((gift) => collection.updateOne({ id: gift.id }, { $set: gift }, { upsert: true })))
console.log(`Imported ${gifts.length} GiftLink items. Collection total: ${await collection.countDocuments()}`)
process.exit(0)