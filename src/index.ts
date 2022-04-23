import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import {
  configureCORS,
  configureCSP,
  configureSession,
  prisma,
} from './config';
import { schema } from './schema';

export const app = express();

app.use(configureCSP());
app.use(configureCORS());

app.use(compression());
app.use(
  express.json({
    limit: '10mb',
  })
);

app.use(configureSession());

app.use(
  '/graphql',
  graphqlHTTP((req, res) => {
    return {
      schema,
      context: {
        prisma,
        req,
        res,
      },
      graphiql: true,
    };
  })
);

app.use(express.static(path.join(__dirname, '..', 'client/dist')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/dist/index.html'));
});
