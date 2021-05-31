#!/bin/sh

npx prisma migrate deploy
npx prisma db seed --preview-feature
yarn start