FROM node:20-alpine3.18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]