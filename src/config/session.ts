import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

const RedisStore = connectRedis(session);

const sessionOptions: SessionOptions = {
  store: new RedisStore({ client: redis }),
  secret: process.env.EXPRESS_SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax',
    // secure: true,
  },
};

declare module 'express-session' {
  interface SessionData {
    user: {
      id: number;
      username: string;
      avatarUrl: string;
      confirmed: boolean;
    };
  }
}

export const configureSession = () => session(sessionOptions);
