import bcrypt from 'bcrypt';
import { Resolvers } from '../lib/generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    auth: (_parent, _args, ctx) => ctx.req.session.user || null,
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
        data: {
          username,
          password: hashedPassword,
          avatar: {
            connect: { publicId: 'avatar_default' },
          },
        },
      });

      return true;
    },
    login: async (_parent, args, ctx) => {
      const { username, password, avatar } = args;

      let user = await ctx.prisma.user.findUnique({
        where: { username },
        include: { avatar: true },
      });
      if (!user) throw new Error('Invalid credentials');

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error('Invalid credentials');

      if (avatar) {
        if (avatar.publicId) {
          user = await ctx.prisma.user.update({
            where: { id: user.id },
            data: {
              confirmed: true,
              avatar: { connect: { publicId: avatar.publicId } },
            },
            include: { avatar: true },
          });
        } else {
          user = await ctx.prisma.user.update({
            where: { id: user.id },
            data: { confirmed: true },
            include: { avatar: true },
          });
        }
      }

      const authUser = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        confirmed: user.confirmed,
      };

      ctx.req.session.user = authUser;
      return authUser;
    },
    logout: (_parent, _args, ctx) => {
      const sessionDestroyPromise = () => {
        return new Promise<boolean>((resolve, reject) => {
          ctx.req.session.destroy((err) => (err ? reject(err) : resolve(true)));
        });
      };

      return sessionDestroyPromise();
    },
  },
};
