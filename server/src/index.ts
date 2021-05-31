import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import playground from 'graphql-playground-middleware-express';
import {
  configureCORS,
  configureCSP,
  configureSession,
  prisma,
} from './config';
import { schema } from './schema';

export const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(configureCSP());
app.use(configureCORS());

app.use(compression());
app.use(express.json({ limit: '10mb' }));

app.use(configureSession());

app.use(
  '/graphql',
  graphqlHTTP((req, res) => {
    return { schema, context: { prisma, req, res } };
  })
);

app.get('/playground', playground({ endpoint: '/graphql' }));
