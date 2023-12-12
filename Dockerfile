FROM node:20
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8001
CMD ["node", "dist/src/main"]
