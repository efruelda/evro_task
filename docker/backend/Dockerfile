# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ../evro_be_todo/package.json ../evro_be_todo/package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
