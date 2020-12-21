FROM node:14.15-alpine
WORKDIR /usr/src/app
EXPOSE 5000
COPY package.json .
COPY yarn.lock .
RUN yarn --non-interactive
COPY . .

RUN yarn run build
CMD ["yarn", "start"]