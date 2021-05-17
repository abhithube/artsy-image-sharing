import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import playground from 'graphql-playground-middleware-express';
import path from 'path';
import { prisma } from './config/db';
import { configureCORS, configureCSP } from './config/security';
import { configureSession } from './config/session';
import { schema } from './schema';

export const app = express();

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'));
  });
}
