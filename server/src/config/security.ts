import cors from 'cors';
import helmet from 'helmet';

export const configureCSP = () =>
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production'
        ? {
            directives: {
              ...helmet.contentSecurityPolicy.getDefaultDirectives(),
              'img-src': [
                "'self'",
                'blob:',
                'data:',
                'res.cloudinary.com',
                'cdn.jsdelivr.net',
              ],
              'script-src': [
                "'self'",
                'cdn.jsdelivr.net',
                `https: 'unsafe-inline'`,
              ],
            },
          }
        : false,
  });

export const configureCORS = () =>
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
