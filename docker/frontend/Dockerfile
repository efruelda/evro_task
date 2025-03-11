# Use Node.js as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ../evro_fe_todo/package.json ../evro_fe_todo/package-lock.json ./
RUN npm install

# Copy everything
COPY . .

# Build the Next.js app
RUN npm run dev

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
