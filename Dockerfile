# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- deps ----------
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci

# ---------- builder ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# gerar prisma client
RUN npx prisma generate

# build next
RUN npm run build

# ---------- runner ----------
FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]