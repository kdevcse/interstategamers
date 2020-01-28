FROM ubuntu:18.04
COPY ./
RUN yarn
CMD gulp update
CMD gulp compile
CMD jest --coverage;
