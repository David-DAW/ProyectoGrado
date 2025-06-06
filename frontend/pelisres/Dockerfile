FROM node:20-alpine AS builder
WORKDIR /nextjs
COPY . .
RUN npm install
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /nextjs


COPY --from=builder /nextjs/.next ./.next
COPY --from=builder /nextjs/public ./public
COPY --from=builder /nextjs/package.json ./package.json
COPY --from=builder /nextjs/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
