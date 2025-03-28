
import clientPromise from "@/lib/mongodb"

export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise
    const db =  client.db("BitLinks")
    const collection = db.collection("url")


    // check if the short url exists
    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return Response.json({ Success: false, error: false, message: 'URL already exits' })
    }

    const result =  await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })

    return Response.json({ Success: true, error: false, message: 'URL Generated Sucessful' })
  }