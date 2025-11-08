FROM node:20
WORKDIR /app
# Install mysql client for wait-for-mysql.sh
RUN apt-get update && apt-get install -y default-mysql-client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN chmod +x ./wait-for-mysql.sh
CMD ["./wait-for-mysql.sh", "db", "npm", "start"]
