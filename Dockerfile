FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

RUN npm run lint

RUN npm run build
RUN mkdir -p /usr/dist/app
RUN cp -r /usr/src/app/dist/. /usr/dist/app

WORKDIR /usr/dist/app
RUN npm install --production

ENV PORT 80

EXPOSE 80
CMD ["node", "server/app.js"]