import { MongoClient } from 'mongodb'
import 'dotenv/config'

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL
const databaseName = process.env.MONGODB_DB || 'giftlink'
let client
let database

async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI or DATABASE_URL is required')
  }

  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    database = client.db(databaseName)
  }

  return database
}

export { connectToDatabase }