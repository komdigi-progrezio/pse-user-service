FROM node:20
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN rm -rf /var/www/assets
RUN npm run build
EXPOSE 8001
VOLUME /var/www/assets
CMD ["node", "dist/src/main"]
