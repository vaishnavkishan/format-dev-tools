# Use Node to install dependencies and build the static site
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifest and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build static assets
COPY . .
RUN yarn build

# Use NGINX to serve the built static files
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
