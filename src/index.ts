import { createServer } from '@graphql-yoga/node';
import express from 'express';
import { configureSession, prisma } from './config';
import { schema } from './schema';

export const app = express();

app.use(
  express.json({
    limit: '10mb',
  })
);

app.use(configureSession());

app.use(
  '/graphql',
  createServer({
    cors: {
      origin: [process.env.CLIENT_URL!],
      credentials: true,
    },
    schema,
    context: (req) => ({
      prisma,
      req: req.req,
    }),
    graphiql: true,
  })
);
