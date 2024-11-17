# Stage 1
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage:2
FROM nginx:1.23


COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration, if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
