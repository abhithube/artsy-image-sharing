import { uploader } from '../config/upload';
import { SortOrder } from '../constants';
import { Resolvers } from '../generated/graphql';

export const resolvers: Resolvers = {
  Post: {
    favorites: async (parent, args, ctx) => {
      let { orderBy: orderByInput, limit, page } = args;

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

      const results = await ctx.prisma.post
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
        where: { postId: parent.id },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
    favoriteCount: (parent, _args, ctx) =>
      ctx.prisma.favorite.count({ where: { postId: parent.id } }),
    comments: async (parent, args, ctx) => {
      let { orderBy: orderByInput, limit, page } = args;

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

      const results = await ctx.prisma.post
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
        where: { postId: parent.id },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
    commentCount: (parent, _args, ctx) =>
      ctx.prisma.comment.count({ where: { postId: parent.id } }),
  },
  Query: {
    posts: async (_parent, args, ctx) => {
      let { orderBy: orderByInput, limit, page, userId } = args;

      const where = userId ? { userId } : {};

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

      const results = await ctx.prisma.post.findMany({
        where,
        include: { user: true },
        orderBy,
        take: limit,
        skip: limit * page,
      });

      const count = await ctx.prisma.post.count();
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return { results, prevPage, nextPage, totalPages };
    },
    post: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      const { id } = args;

      const post = await ctx.prisma.post.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!post) throw new Error('Post not found');

      let isFavorite = false;
      if (user) {
        const favorite = await ctx.prisma.favorite.findUnique({
          where: { postId_userId: { postId: id, userId: user.id } },
        });
        isFavorite = favorite !== null;
      }

      return { result: post, isFavorite };
    },
    relatedPosts: async (_parent, args, ctx) => {
      const { postId } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new Error('Post not found');

      let posts = await ctx.prisma.post.findMany({
        where: { AND: { userId: post.userId, id: { not: post.id } } },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      const ids = [postId, ...posts.map(({ id }) => id)];

      if (posts.length < 10) {
        const more = await ctx.prisma.post.findMany({
          where: { id: { notIn: ids } },
          include: { user: true },
          orderBy: { favorites: { count: 'desc' } },
          take: 10 - posts.length,
        });
        posts.push(...more);
      }

      return posts;
    },
  },
  Mutation: {
    createPost: async (_parent, args, ctx) => {
      const user = ctx.req.session.user;
      if (!user) throw new Error('User not authenticated');

      const { title, body, file } = args;
      const { secure_url } = await uploader.upload(file, {
        upload_preset: 'q_eco',
      });
      return ctx.prisma.post.create({
        data: { title, body, imageUrl: secure_url, userId: user.id },
        include: { user: true },
      });
    },
    updatePost: async (_parent, args, ctx) => {
      const user = ctx.req.session.user;
      if (!user) throw new Error('User not authenticated');

      const { id, title, body } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error('Post not found');
      if (post.userId !== user.id) throw new Error('User not authorized');

      const data: { title?: string; body?: string } = {};
      if (title) data.title = title;
      if (body) data.body = body;

      return ctx.prisma.post.update({
        where: { id },
        data,
        include: { user: true },
      });
    },
    deletePost: async (_parent, args, ctx) => {
      const user = ctx.req.session.user;
      if (!user) throw new Error('User not authenticated');

      const { id } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error('Post not found');
      if (post.userId !== user.id) throw new Error('User not authorized');

      return ctx.prisma.post.delete({
        where: { id },
        include: { user: true },
      });
    },
  },
};
