import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  id: Scalars['Int'];
  username: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  confirmed: Scalars['Boolean'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  body: Scalars['String'];
  user: User;
  post: Post;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CommentOrderByInput = {
  field: CommentSortField;
  direction: SortDirection;
};

export enum CommentSortField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  results: Array<Comment>;
  prevPage?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
};


export type Favorite = {
  __typename?: 'Favorite';
  id: Scalars['Int'];
  user: User;
  post: Post;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type FavoriteOrderByInput = {
  field: FavoriteSortField;
  direction: SortDirection;
};

export type FavoriteResponse = {
  __typename?: 'FavoriteResponse';
  result: Favorite;
  count: Scalars['Int'];
};

export enum FavoriteSortField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type FavoritesResponse = {
  __typename?: 'FavoritesResponse';
  results: Array<Favorite>;
  prevPage?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createFavorite?: Maybe<FavoriteResponse>;
  createPost: Post;
  deleteComment: Comment;
  deleteFavorite?: Maybe<FavoriteResponse>;
  deletePost: Post;
  deleteUser: User;
  login: Auth;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  updateComment: Comment;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationCreateFavoriteArgs = {
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  file: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteFavoriteArgs = {
  postId: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  body: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  currentPassword: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  user: User;
  favorites?: Maybe<FavoritesResponse>;
  favoriteCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<CommentsResponse>;
  commentCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PostFavoritesArgs = {
  orderBy?: Maybe<FavoriteOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type PostCommentsArgs = {
  orderBy?: Maybe<CommentOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type PostOrderByInput = {
  field: PostSortField;
  direction: SortDirection;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  result: Post;
  isFavorite: Scalars['Boolean'];
};

export enum PostSortField {
  Title = 'TITLE',
  FavoriteCount = 'FAVORITE_COUNT',
  CommentCount = 'COMMENT_COUNT',
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type PostsResponse = {
  __typename?: 'PostsResponse';
  results: Array<Post>;
  prevPage?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<Auth>;
  comments: CommentsResponse;
  favorites: FavoritesResponse;
  post?: Maybe<PostResponse>;
  posts: PostsResponse;
  relatedPosts?: Maybe<Array<Post>>;
  user: User;
};


export type QueryCommentsArgs = {
  postId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryFavoritesArgs = {
  postId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FavoriteOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  userId?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryRelatedPostsArgs = {
  postId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  posts?: Maybe<PostsResponse>;
  postCount?: Maybe<Scalars['Int']>;
  favorites?: Maybe<FavoritesResponse>;
  favoriteCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<CommentsResponse>;
  commentCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type UserPostsArgs = {
  orderBy?: Maybe<PostOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type UserFavoritesArgs = {
  orderBy?: Maybe<FavoriteOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type UserCommentsArgs = {
  orderBy?: Maybe<CommentOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<Auth>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentOrderByInput: CommentOrderByInput;
  CommentSortField: CommentSortField;
  CommentsResponse: ResolverTypeWrapper<CommentsResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Favorite: ResolverTypeWrapper<Favorite>;
  FavoriteOrderByInput: FavoriteOrderByInput;
  FavoriteResponse: ResolverTypeWrapper<FavoriteResponse>;
  FavoriteSortField: FavoriteSortField;
  FavoritesResponse: ResolverTypeWrapper<FavoritesResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostOrderByInput: PostOrderByInput;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  PostSortField: PostSortField;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  SortDirection: SortDirection;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentOrderByInput: CommentOrderByInput;
  CommentsResponse: CommentsResponse;
  DateTime: Scalars['DateTime'];
  Favorite: Favorite;
  FavoriteOrderByInput: FavoriteOrderByInput;
  FavoriteResponse: FavoriteResponse;
  FavoritesResponse: FavoritesResponse;
  Mutation: {};
  Post: Post;
  PostOrderByInput: PostOrderByInput;
  PostResponse: PostResponse;
  PostsResponse: PostsResponse;
  Query: {};
  User: User;
};

export type AuthResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommentsResponse'] = ResolversParentTypes['CommentsResponse']> = {
  results?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FavoriteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FavoriteResponse'] = ResolversParentTypes['FavoriteResponse']> = {
  result?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoritesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FavoritesResponse'] = ResolversParentTypes['FavoritesResponse']> = {
  results?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'body' | 'postId'>>;
  createFavorite?: Resolver<Maybe<ResolversTypes['FavoriteResponse']>, ParentType, ContextType, RequireFields<MutationCreateFavoriteArgs, 'postId'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'title' | 'file'>>;
  deleteComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteFavorite?: Resolver<Maybe<ResolversTypes['FavoriteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFavoriteArgs, 'postId'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'username' | 'password'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'id' | 'body'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'currentPassword'>>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoritesResponse']>, ParentType, ContextType, RequireFields<PostFavoritesArgs, 'orderBy' | 'limit' | 'page'>>;
  favoriteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentsResponse']>, ParentType, ContextType, RequireFields<PostCommentsArgs, 'orderBy' | 'limit' | 'page'>>;
  commentCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']> = {
  result?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = {
  results?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auth?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['CommentsResponse'], ParentType, ContextType, RequireFields<QueryCommentsArgs, 'orderBy' | 'limit' | 'page'>>;
  favorites?: Resolver<ResolversTypes['FavoritesResponse'], ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'orderBy' | 'limit' | 'page'>>;
  post?: Resolver<Maybe<ResolversTypes['PostResponse']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostsResponse'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'orderBy' | 'limit' | 'page'>>;
  relatedPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<QueryRelatedPostsArgs, 'postId'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<ResolversTypes['PostsResponse']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'orderBy' | 'limit' | 'page'>>;
  postCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoritesResponse']>, ParentType, ContextType, RequireFields<UserFavoritesArgs, 'orderBy' | 'limit' | 'page'>>;
  favoriteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentsResponse']>, ParentType, ContextType, RequireFields<UserCommentsArgs, 'orderBy' | 'limit' | 'page'>>;
  commentCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Auth?: AuthResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentsResponse?: CommentsResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Favorite?: FavoriteResolvers<ContextType>;
  FavoriteResponse?: FavoriteResponseResolvers<ContextType>;
  FavoritesResponse?: FavoritesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  PostsResponse?: PostsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
