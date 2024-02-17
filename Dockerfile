FROM node:16.20.1 AS BUILD_IMAGE

WORKDIR ./

COPY package.json yarn.lock ./
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 4000

CMD yarn start
