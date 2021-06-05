FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn prisma generate

CMD [ "/bin/sh", "./entrypoint.sh" ]