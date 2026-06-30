import clientPromise from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return Response.json(
        { Success: false, error: true, message: 'All fields are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("BitLinks")
    const collection = db.collection("contacts")

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date()
    })

    return Response.json({ Success: true, error: false, message: 'Message sent successfully' })
  } catch (err) {
    console.error(err)
    return Response.json(
      { Success: false, error: true, message: err.message },
      { status: 500 }
    )
  }
}