import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { configureSession, prisma } from './config';
import { schema } from './schema';

export const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({
      req,
      res,
      prisma,
    }),
  });

  await server.start();

  app.use(
    express.json({
      limit: '10mb',
    })
  );

  app.use(configureSession());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '..', 'client', 'dist')));

    app.get('*', (_, res) => {
      res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
    });
  }

  server.applyMiddleware({
    app,
    cors: {
      origin: [process.env.CLIENT_URL!, 'https://studio.apollographql.com'],
      credentials: true,
    },
  });

  return httpServer;
};
