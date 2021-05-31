FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

CMD [ "/bin/sh", "./entrypoint-prod.sh" ]