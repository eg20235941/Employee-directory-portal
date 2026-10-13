# 1. Use a lightweight Node.js environment as the base
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy only the package files first to cache dependencies
COPY package*.json ./

# 4. Install the required NPM packages inside the container
RUN npm install

# 5. Copy the rest of your server code into the container
COPY . .

# 6. Expose the port your Express server uses
EXPOSE 5000

# 7. Define the command to start the server
CMD ["npm", "run", "dev"]