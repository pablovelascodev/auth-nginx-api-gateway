FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY index.js index.js

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]
