FROM node:latest
RUN yarn
RUN gulp update
RUN gulp compile
RUN jest --coverage;
COPY ./dist /dist/
