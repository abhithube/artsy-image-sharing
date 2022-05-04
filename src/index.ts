import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import { configureSession, prisma } from './config';
import { schema } from './schema';

export const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: (req) => ({
      req: req.req,
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

  server.applyMiddleware({
    app,
    cors: {
      origin: [process.env.CLIENT_URL!, 'https://studio.apollographql.com'],
      credentials: true,
    },
  });

  return httpServer;
};
