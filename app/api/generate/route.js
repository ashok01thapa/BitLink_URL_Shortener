import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const { url, shorturl } = body

    if (!url || !shorturl) {
      return Response.json(
        { success: false, error: true, message: 'URL and short URL are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("BitLinks")
    const collection = db.collection("url")

    const existing = await collection.findOne({ shorturl: shorturl })
    if (existing) {
      return Response.json(
        { success: false, error: true, message: 'This short URL is already taken' },
        { status: 400 }
      )
    }

    await collection.insertOne({
      url,
      shorturl,
      createdAt: new Date()
    })

    return Response.json({ success: true, error: false, message: 'Short URL created successfully' })
  } catch (err) {
    console.error(err)
    return Response.json(
      { success: false, error: true, message: err.message },
      { status: 500 }
    )
  }
}