FROM node:18-alpine

WORKDIR /app/usr
COPY package.json package-lock.json ./

RUN npm install --only-prod
COPY . .

CMD ["npm", "start"]