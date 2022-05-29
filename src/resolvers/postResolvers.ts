import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { upload } from '../config';
import { Resolvers } from '../lib/generated/graphql';
import { parseOrderBy } from '../lib/parser';

export const resolvers: Resolvers = {
  Post: {
    favorites: async (parent, args, ctx) => {
      const { orderBy: orderByInput } = args;
      let { limit, page } = args;

      const orderBy = parseOrderBy(orderByInput);

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const results = await ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .favorites({
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
        where: {
          postId: parent.id,
        },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return {
        results,
        prevPage,
        nextPage,
        totalPages,
      };
    },
    favoriteCount: (parent, _args, ctx) =>
      ctx.prisma.favorite.count({
        where: {
          postId: parent.id,
        },
      }),
    comments: async (parent, args, ctx) => {
      const { orderBy: orderByInput } = args;
      let { limit, page } = args;

      const orderBy = parseOrderBy(orderByInput);

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const results = await ctx.prisma.post
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .comments({
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

      const count = await ctx.prisma.comment.count({
        where: {
          postId: parent.id,
        },
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return {
        results,
        prevPage,
        nextPage,
        totalPages,
      };
    },
    commentCount: (parent, _args, ctx) =>
      ctx.prisma.comment.count({
        where: {
          postId: parent.id,
        },
      }),
  },
  Query: {
    posts: async (_parent, args, ctx) => {
      const { userId, orderBy: orderByInput } = args;
      let { limit, page } = args;

      const where = userId
        ? {
            userId,
          }
        : {};
      const orderBy = parseOrderBy(orderByInput);

      if (limit < 1) limit = 20;
      if (page < 0) page = 0;

      const results = await ctx.prisma.post.findMany({
        where,
        include: {
          user: true,
        },
        orderBy,
        take: limit,
        skip: limit * page,
      });

      const count = await ctx.prisma.post.count({
        where,
      });
      const totalPages = Math.ceil(count / limit);
      const prevPage = page === 0 ? null : page - 1;
      const nextPage = page === totalPages - 1 ? null : page + 1;

      return {
        results,
        prevPage,
        nextPage,
        totalPages,
      };
    },
    post: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      const { id } = args;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });
      if (!post) throw new Error('Post not found');

      let isFavorite = false;
      if (user) {
        const favorite = await ctx.prisma.favorite.findUnique({
          where: {
            postId_userId: {
              postId: id,
              userId: user.id,
            },
          },
        });
        isFavorite = favorite !== null;
      }

      return {
        result: post,
        isFavorite,
      };
    },
    relatedPosts: async (_parent, args, ctx) => {
      const { postId } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id: postId } });
      if (!post) throw new Error('Post not found');

      const posts = await ctx.prisma.post.findMany({
        where: {
          AND: {
            userId: post.userId,
            id: {
              not: post.id,
            },
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      });

      const ids = [postId, ...posts.map(({ id }: { id: number }) => id)];

      if (posts.length < 10) {
        const more = await ctx.prisma.post.findMany({
          where: {
            id: { notIn: ids },
          },
          include: {
            user: true,
          },
          orderBy: {
            favorites: {
              _count: 'desc',
            },
          },
          take: 10 - posts.length,
        });
        posts.push(...more);
      }

      return posts;
    },
  },
  Mutation: {
    createPost: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { title, body, file } = args;

      const imageBuffer = Buffer.from(file.split(',')[1], 'base64');
      const thumbnailBuffer = await sharp(
        Buffer.from(file.split(',')[1], 'base64')
      )
        .webp()
        .resize(480, 480)
        .toBuffer();

      const extension = title.split('.').pop();

      const uuid = randomUUID();
      const imageUrl = await upload(`uploads/${uuid}.webp`, thumbnailBuffer);
      await upload(`uploads/original/${uuid}.${extension}`, imageBuffer);

      return ctx.prisma.post.create({
        data: {
          title,
          body,
          imageUrl,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
    },
    updatePost: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { id, title, body } = args;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!post) throw new Error('Post not found');
      if (post.userId !== user.id) throw new Error('User not authorized');

      const data: {
        title?: string;
        body?: string;
      } = {};
      if (title) data.title = title;
      if (body) data.body = body;

      return ctx.prisma.post.update({
        where: {
          id,
        },
        data,
        include: {
          user: true,
        },
      });
    },
    deletePost: async (_parent, args, ctx) => {
      const { user } = ctx.req.session;
      if (!user) throw new Error('User not authenticated');

      const { id } = args;

      const post = await ctx.prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error('Post not found');
      if (post.userId !== user.id) throw new Error('User not authorized');

      return ctx.prisma.post.delete({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });
    },
  },
};
