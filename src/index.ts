import { createServer } from '@graphql-yoga/node';
import cors from 'cors';
import express from 'express';
import { configureSession, prisma } from './config';
import { schema } from './schema';

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '10mb',
  })
);

app.use(configureSession());

app.use(
  '/graphql',
  createServer({
    schema,
    context: (req) => ({
      prisma,
      req: req.req,
    }),
    graphiql: true,
  })
);
