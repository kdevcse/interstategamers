FROM node:latest
COPY ./
RUN yarn
CMD gulp update
CMD gulp compile
CMD jest --coverage;
