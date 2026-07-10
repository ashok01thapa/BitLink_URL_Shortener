import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
let client
let clientPromise

function getClientPromise() {
  if (!uri) {
    throw new Error('Add Mongo URI to .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect().catch((err) => {
        // Clear the cache on failure so the next request retries
        // instead of reusing this broken promise forever
        global._mongoClientPromise = null
        throw err
      })
    }
    return global._mongoClientPromise
  }

  if (!clientPromise) {
    client = new MongoClient(uri)
    clientPromise = client.connect().catch((err) => {
      clientPromise = null
      throw err
    })
  }
  return clientPromise
}

export default { then: (res, rej) => getClientPromise().then(res, rej) }