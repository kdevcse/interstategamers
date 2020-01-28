FROM node:latest
CMD yarn build:prod
COPY ./dist /dist/
