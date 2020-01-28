FROM node:latest
RUN yarn
CMD gulp update
CMD gulp compile
CMD jest --coverage;
