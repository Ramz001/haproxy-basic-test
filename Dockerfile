FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json first for caching
COPY package*.json ./
RUN npm install

# Copy everything from the root (including src)
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
