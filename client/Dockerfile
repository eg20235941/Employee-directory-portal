# client/Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./

# Step 4: Cached npm install (will not re-download!)
RUN npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retries 5 && \
    npm config set maxsockets 3 && \
    npm install --no-audit --no-fund

# Step 5: Copy index.html, vite.config.js, and src/ into the container!
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]