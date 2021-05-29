import { SortOrder } from '../lib/constants';
import { Resolvers } from '../lib/generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    comments: async (_parent, args, ctx) => {
      const { postId, userId, orderBy: orderByInput } = args;
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

      let where: { postId?: number; userId?: number } = {};
      if (postId) where = { ...where, postId };
      if (userId) where = { ...where, userId };

      const results = await ctx.prisma.comment.findMany({
        where,
        include: { post: { include: { user: true } }, user: true },
        orderBy,
        take: limit,
        skip: limit * page,
      });

      const count = await ctx.prisma.comment.count({ where });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
  },
  Mutation: {
    createComment: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { body, postId } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new Error('Post not found');

      return ctx.prisma.comment.create({
        data: { body, postId, userId: user.id },
        include: { post: { include: { user: true } }, user: true },
      });
    },
    updateComment: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { id, body } = args;

      const comment = await ctx.prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new Error('Comment not found');
      if (comment.userId !== user.id) throw new Error('User not authorized');

      return ctx.prisma.comment.update({
        where: { id },
        data: { body },
        include: { post: { include: { user: true } }, user: true },
      });
    },
    deleteComment: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { id } = args;

      const comment = await ctx.prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new Error('Comment not found');
      if (comment.userId !== user.id) throw new Error('User not authorized');

      return ctx.prisma.comment.delete({
        where: { id },
        include: { post: { include: { user: true } }, user: true },
      });
    },
  },
};
