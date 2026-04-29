# ---- Frontend Dockerfile (multi-stage) ----
# Stage 1: Build the Vite/React app
# Stage 2: Serve the static files with Nginx

# --------------- Build Stage ---------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies needed for the build)
RUN npm ci

# Copy source code
COPY . .

# Build the production bundle
# VITE_API_URL is injected at build time so the browser knows where the backend is
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# --------------- Serve Stage ---------------
FROM nginx:1.27-alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config that handles SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
