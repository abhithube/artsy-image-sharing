import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import Redis from 'ioredis';
import { Image } from '../lib/generated/graphql';

const redis = new Redis(process.env.REDIS_URL);

const RedisStore = connectRedis(session);

const sessionOptions: SessionOptions = {
  store: new RedisStore({ client: redis }),
  secret: process.env.EXPRESS_SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
};

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      username: string;
      avatar: Image;
      confirmed: boolean;
    };
  }
}

export const configureSession = () => session(sessionOptions);
