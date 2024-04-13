FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY index.js index.js

RUN npm install

EXPOSE 3002

CMD ["node", "index.js"]
