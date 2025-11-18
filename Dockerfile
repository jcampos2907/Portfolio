# Stage 1: Build Stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Production Stage (Express)
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist  
COPY --from=build /app/server.js /app/server.js  
COPY package*.json /app  

# Install only production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Force production mode
ENV NODE_ENV=production
ENV PORT=3000

# Set the command to run your Express server
EXPOSE 3000
CMD ["node", "server.js"]
