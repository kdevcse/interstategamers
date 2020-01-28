FROM node:latest
RUN yarn build:prod
COPY ./dist /dist/
