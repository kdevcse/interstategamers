FROM node:latest

#Create Work Directory
WORKDIR /usr/src/

#Copy required files for compilation
COPY package.json .
COPY requirements.txt .
COPY runtime.txt .

#Install packages
RUN yarn

#Add rest of the code
ADD . /usr/src/

#Build site
RUN yarn build:prod
