FROM node:16.20.1 AS BUILD_IMAGE

WORKDIR ./

COPY package.json yarn.lock ./
COPY . .

RUN yarn install
EXPOSE 4000
RUN yarn global add serve
RUN serve -s ./build