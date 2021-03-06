import { Resolvers } from '../lib/generated/graphql';
import { parseOrderBy } from '../lib/parser';

export const resolvers: Resolvers = {
  Query: {
    favorites: async (_parent, args, ctx) => {
      const { postId, userId, orderBy: orderByInput } = args;
      let { limit, page } = args;

      const orderBy = parseOrderBy(orderByInput);

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      let where: {
        postId?: number;
        userId?: number;
      } = {};

      if (postId)
        where = {
          ...where,
          postId,
        };
      if (userId)
        where = {
          ...where,
          userId,
        };

      const results = await ctx.prisma.favorite.findMany({
        where,
        include: {
          post: {
            include: {
              user: true,
            },
          },
          user: true,
        },
        orderBy,
        take: limit,
        skip: limit * page,
      });

      const count = await ctx.prisma.favorite.count({
        where,
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
  },
  Mutation: {
    createFavorite: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { postId } = args;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) throw new Error('Post not found');

      const result = await ctx.prisma.favorite.create({
        data: {
          postId,
          userId: user.id,
        },
        include: {
          post: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });

      const count = await ctx.prisma.favorite.count({
        where: {
          postId: args.postId,
        },
      });

      return { result, count };
    },
    deleteFavorite: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { postId } = args;

      const favorite = await ctx.prisma.favorite.findUnique({
        where: {
          postId_userId: {
            postId,
            userId: user.id,
          },
        },
      });
      if (!favorite) throw new Error('Favorite not found');
      if (favorite.userId !== user.id) throw new Error('User not authorized');

      const result = await ctx.prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
        include: {
          post: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });

      const count = await ctx.prisma.favorite.count({
        where: {
          postId: args.postId,
        },
      });

      return {
        result,
        count,
      };
    },
  },
};
