# Dockerfile for frontend (React)
FROM node:23.10.0-alpine

WORKDIR /app

# Install deps and TLS certs
COPY package.json package-lock.json ./
RUN apk add --no-cache bash curl ca-certificates && update-ca-certificates && \
    npm install --legacy-peer-deps

COPY . .

# Build optimized static site
RUN npm run build

# Install serve for static file hosting
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Run server on 0.0.0.0 inside container
CMD ["serve", "-s", "dist", "-l", "0.0.0.0:5173"]
