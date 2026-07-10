import { createClient } from "redis";

let client;

export async function getRedisClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
    client.on("error", (err) => console.error("Redis error:", err));
    await client.connect();
  }
  return client;
}

// Example usage in your shorten/[code] route:
//
// const redis = await getRedisClient();
// const cached = await redis.get(`shorturl:${code}`);
// if (cached) return NextResponse.redirect(cached);
//
// const doc = await ShortUrl.findOne({ code });
// if (doc) {
//   await redis.set(`shorturl:${code}`, doc.longUrl, { EX: 3600 }); // cache 1 hour
//   return NextResponse.redirect(doc.longUrl);
// }