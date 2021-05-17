import bcrypt from 'bcrypt';
import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    auth: (_parent, _args, ctx) => {
      const { user } = ctx.req.session;
      if (user) return user;
      else return null;
    },
  },
  Mutation: {
    register: async (_parent, args, ctx) => {
      const { username, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.findUnique({
        where: { username },
      });
      if (user) throw new Error('Username already taken');

      await ctx.prisma.user.create({
        data: { username, password: hashedPassword },
      });

      return true;
    },
    login: async (_parent, args, ctx) => {
      const { username, password, avatarUrl } = args;

      let user = await ctx.prisma.user.findUnique({ where: { username } });
      if (!user) throw new Error('Invalid credentials');

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error('Invalid credentials');

      if (avatarUrl !== undefined) {
        user = await ctx.prisma.user.update({
          where: { id: user.id },
          data: { avatarUrl, confirmed: true },
        });
      }

      const authUser = {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl || undefined,
        confirmed: user.confirmed,
      };

      ctx.req.session.user = authUser;
      return authUser;
    },
    logout: async (_parent, _args, ctx) => {
      const sessionDestroyPromise = () => {
        return new Promise<boolean>((resolve, reject) => {
          ctx.req.session.destroy(err => {
            if (err) return reject(err);
            resolve(true);
          });
        });
      };

      return await sessionDestroyPromise();
    },
  },
};
