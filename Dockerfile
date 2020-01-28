FROM node:latest
COPY package.json .
RUN yarn build:prod
COPY ./dist /dist/
