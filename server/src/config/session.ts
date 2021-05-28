import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const RedisStore = connectRedis(session);

const sessionOptions: SessionOptions = {
  store: new RedisStore({ client: redis }),
  secret: process.env.EXPRESS_SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      username: string;
      avatarUrl?: string;
      confirmed: boolean;
    };
  }
}

export const configureSession = () => session(sessionOptions);
