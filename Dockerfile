# ---- Base image ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Baked into the client bundle at build time
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

# Needed at build time so `next build` can collect page data for API routes
# that touch Mongo/Redis (e.g. /api/contact). Names MUST match what the app
# reads via process.env.MONGODB_URI / process.env.REDIS_URL
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

# Requires output: 'standalone' in next.config.mjs
RUN npm run build

# ---- Production runner (tiny image) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Only copy the minimal traced output + static assets — no full node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]