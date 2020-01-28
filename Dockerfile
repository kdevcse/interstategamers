FROM node:latest

#Create Work Directory
WORKDIR /usr/src/

#Copy package.json to WORKDIR
COPY package.json .

#Install packages
RUN yarn

#Add rest of the code
ADD . /usr/src/

#Build site
RUN yarn build:prod
