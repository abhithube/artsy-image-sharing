#!/bin/sh

yarn prisma migrate dev
yarn prisma db seed --preview-feature
yarn dev