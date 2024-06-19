FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.development .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
