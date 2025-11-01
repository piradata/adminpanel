# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable corepack to use bundled pnpm
RUN corepack enable

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# Build Next.js and export static site (requires "export" script in package.json)
RUN pnpm build && pnpm export

# Production stage: Nginx to serve static files
FROM nginx:alpine

# Copy exported static site output
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
