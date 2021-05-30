#!/bin/sh

npx prisma migrate dev
npx prisma db seed --preview-feature
yarn dev