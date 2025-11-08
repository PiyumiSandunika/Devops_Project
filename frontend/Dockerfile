# Use Node to build and run the app
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Expose Vite port
EXPOSE 5173

# Run the app in development mode
CMD ["npm", "run", "dev"]

