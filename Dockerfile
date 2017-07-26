FROM node:8-alpine AS base

FROM base AS dependencies

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app


RUN npm install

FROM dependencies AS prod-dependencies

RUN rm -rf node_modules
RUN npm install --production

FROM dependencies AS source
COPY . .

FROM source AS test
RUN npm run lint

FROM source AS build
RUN npm run build

FROM base AS release
RUN mkdir -p /usr/dist/app
WORKDIR /usr/dist/app

COPY --from=build /usr/src/app/dist/. /usr/dist/app
COPY --from=prod-dependencies /usr/src/app/node_modules ./node_modules

ENV PORT 80

EXPOSE 80
CMD ["node", "server/app.js"]