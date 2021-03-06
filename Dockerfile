FROM node:12.13.0-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean
COPY . .
