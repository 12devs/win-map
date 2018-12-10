FROM node:alpine

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN echo -e "@types:registry=https://registry.npmjs.org/\n@bct:registry=http://npmjs.dev.cgbc.rocks:4873/\n//npmjs.dev.cgbc.rocks:4873/:_authToken=\"gkiTk7oVlnmh9FQD7yT4UA==\"\ninit.author.name=den\ninit.author.email=test@test.co" > ~/.npmrc
COPY package.json /usr/src/app/
COPY config /usr/src/app/config
COPY dist /usr/src/app/dist
COPY public /usr/src/app/public
COPY sw /usr/src/app/sw

RUN npm install --only=production

CMD ["npm", "start"]
