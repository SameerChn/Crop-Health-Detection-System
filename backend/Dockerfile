# ---- Backend Dockerfile ----
# Uses Node 20 LTS on Alpine for a small, production-ready image.

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the rest of the backend source
COPY . .

# Expose the port the server listens on
EXPOSE 5000

# Run as non-root user for security
USER node

# Start the backend server
CMD ["node", "server.js"]
