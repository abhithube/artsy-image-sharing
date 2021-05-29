import bcrypt from 'bcrypt';
import { SortOrder } from '../lib/constants';
import { Resolvers } from '../lib/generated/graphql';

export const resolvers: Resolvers = {
  User: {
    posts: async (parent, args, ctx) => {
      const { orderBy: orderByInput } = args;
      let { limit, page } = args;

      const direction =
        orderByInput.direction === 'ASC' ? SortOrder.ASC : SortOrder.DESC;
      let orderBy;
      switch (orderByInput.field) {
        case 'TITLE':
          orderBy = { title: direction };
          break;
        case 'FAVORITE_COUNT':
          orderBy = { favorites: { count: direction } };
          break;
        case 'COMMENT_COUNT':
          orderBy = { favorites: { count: direction } };
          break;
        case 'CREATED_AT':
          orderBy = { createdAt: direction };
          break;
        case 'UPDATED_AT':
          orderBy = { updatedAt: direction };
          break;
        default:
          orderBy = { createdAt: direction };
      }

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const posts = await ctx.prisma.user
        .findUnique({ where: { id: parent.id } })
        .posts({
          include: { user: true },
          orderBy,
          take: limit,
          skip: limit * page,
        });

      const count = await ctx.prisma.post.count();
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results: posts, prevPage, nextPage, totalPages };
    },
    postCount: (parent, _args, ctx) =>
      ctx.prisma.favorite.count({ where: { userId: parent.id } }),
    favorites: async (parent, args, ctx) => {
      const { orderBy: orderByInput } = args;
      let { limit, page } = args;

      const direction =
        orderByInput.direction === 'ASC' ? SortOrder.ASC : SortOrder.DESC;
      let orderBy;
      switch (orderByInput.field) {
        case 'CREATED_AT':
          orderBy = { createdAt: direction };
          break;
        case 'UPDATED_AT':
          orderBy = { updatedAt: direction };
          break;
        default:
          orderBy = { createdAt: direction };
      }

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const results = await ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .favorites({
          include: { post: { include: { user: true } }, user: true },
          orderBy,
          take: limit,
          skip: limit * page,
        });

      const count = await ctx.prisma.favorite.count({
        where: { userId: parent.id },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
    favoriteCount: (parent, _args, ctx) =>
      ctx.prisma.favorite.count({ where: { userId: parent.id } }),
    comments: async (parent, args, ctx) => {
      const { orderBy: orderByInput } = args;
      let { limit, page } = args;

      const direction =
        orderByInput.direction === 'ASC' ? SortOrder.ASC : SortOrder.DESC;
      let orderBy;
      switch (orderByInput.field) {
        case 'CREATED_AT':
          orderBy = { createdAt: direction };
          break;
        case 'UPDATED_AT':
          orderBy = { updatedAt: direction };
          break;
        default:
          orderBy = { createdAt: direction };
      }

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const results = await ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .comments({
          include: { post: { include: { user: true } }, user: true },
          orderBy,
          take: limit,
          skip: limit * page,
        });

      const count = await ctx.prisma.comment.count({
        where: { userId: parent.id },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
    commentCount: (parent, _args, ctx) =>
      ctx.prisma.comment.count({ where: { userId: parent.id } }),
  },
  Query: {
    user: async (_parent, args, ctx) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: args.id } });
      if (!user) throw new Error('User not found');

      return user;
    },
  },
  Mutation: {
    updateUser: async (_parent, args, ctx) => {
      const { user: authUser } = ctx.req.session;
      if (!authUser) throw new Error('User not authenticated');

      const { currentPassword, username, password, avatarUrl } = args;

      let user = await ctx.prisma.user.findUnique({
        where: { id: authUser.id },
      });
      if (!user) throw new Error('User not found');

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) throw new Error('Invalid credentials');

      const data: {
        username?: string;
        password?: string;
        avatarUrl?: string;
        confirmed?: boolean;
      } = {};
      if (username) data.username = username;
      if (password) data.password = password;
      if (avatarUrl) data.avatarUrl = avatarUrl;

      user = await ctx.prisma.user.update({ where: { id: authUser.id }, data });
      authUser.username = user.username;
      authUser.avatarUrl = user.avatarUrl || undefined;

      return user;
    },
    deleteUser: async (_parent, _args, ctx) => {
      const { user: authUser } = ctx.req.session;
      if (!authUser) throw new Error('User not authenticated');

      const user = await ctx.prisma.user.delete({ where: { id: authUser.id } });
      const sessionDestroyPromise = () => {
        return new Promise<boolean>((resolve, reject) => {
          ctx.req.session.destroy((err) => (err ? reject(err) : resolve(true)));
        });
      };

      await sessionDestroyPromise();

      return user;
    },
  },
};
