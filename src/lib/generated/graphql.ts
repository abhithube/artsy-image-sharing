import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Auth = {
  __typename?: 'Auth';
  avatarUrl: Scalars['String'];
  confirmed: Scalars['Boolean'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentOrderByInput = {
  direction: SortDirection;
  field: CommentSortField;
};

export enum CommentSortField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  results: Array<Comment>;
  totalPages: Scalars['Int'];
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type FavoriteOrderByInput = {
  direction: SortDirection;
  field: FavoriteSortField;
};

export type FavoriteResponse = {
  __typename?: 'FavoriteResponse';
  count: Scalars['Int'];
  result: Favorite;
};

export enum FavoriteSortField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type FavoritesResponse = {
  __typename?: 'FavoritesResponse';
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  results: Array<Favorite>;
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
  body?: InputMaybe<Scalars['String']>;
  file: Scalars['String'];
  title: Scalars['String'];
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
  avatar?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  body: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  commentCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<CommentsResponse>;
  createdAt: Scalars['DateTime'];
  favoriteCount?: Maybe<Scalars['Int']>;
  favorites?: Maybe<FavoritesResponse>;
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type PostCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CommentOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
};


export type PostFavoritesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FavoriteOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
};

export type PostOrderByInput = {
  direction: SortDirection;
  field: PostSortField;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  isFavorite: Scalars['Boolean'];
  result: Post;
};

export enum PostSortField {
  CommentCount = 'COMMENT_COUNT',
  CreatedAt = 'CREATED_AT',
  FavoriteCount = 'FAVORITE_COUNT',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export type PostsResponse = {
  __typename?: 'PostsResponse';
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  results: Array<Post>;
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
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CommentOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryFavoritesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FavoriteOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PostOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
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
  avatarUrl: Scalars['String'];
  commentCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<CommentsResponse>;
  createdAt: Scalars['DateTime'];
  favoriteCount?: Maybe<Scalars['Int']>;
  favorites?: Maybe<FavoritesResponse>;
  id: Scalars['Int'];
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<PostsResponse>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type UserCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CommentOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
};


export type UserFavoritesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FavoriteOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
};


export type UserPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PostOrderByInput>;
  page?: InputMaybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostOrderByInput: PostOrderByInput;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  PostSortField: PostSortField;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  SortDirection: SortDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentOrderByInput: CommentOrderByInput;
  CommentsResponse: CommentsResponse;
  DateTime: Scalars['DateTime'];
  Favorite: Favorite;
  FavoriteOrderByInput: FavoriteOrderByInput;
  FavoriteResponse: FavoriteResponse;
  FavoritesResponse: FavoritesResponse;
  Int: Scalars['Int'];
  Mutation: {};
  Post: Post;
  PostOrderByInput: PostOrderByInput;
  PostResponse: PostResponse;
  PostsResponse: PostsResponse;
  Query: {};
  String: Scalars['String'];
  Upload: Scalars['Upload'];
  User: User;
};

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = Context, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CommentsResponse'] = ResolversParentTypes['CommentsResponse']> = {
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FavoriteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FavoriteResponse'] = ResolversParentTypes['FavoriteResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoritesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FavoritesResponse'] = ResolversParentTypes['FavoritesResponse']> = {
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Favorite']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'body' | 'postId'>>;
  createFavorite?: Resolver<Maybe<ResolversTypes['FavoriteResponse']>, ParentType, ContextType, RequireFields<MutationCreateFavoriteArgs, 'postId'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'file' | 'title'>>;
  deleteComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteFavorite?: Resolver<Maybe<ResolversTypes['FavoriteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFavoriteArgs, 'postId'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'password' | 'username'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'body' | 'id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'currentPassword'>>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentsResponse']>, ParentType, ContextType, RequireFields<PostCommentsArgs, 'limit' | 'orderBy' | 'page'>>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  favoriteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoritesResponse']>, ParentType, ContextType, RequireFields<PostFavoritesArgs, 'limit' | 'orderBy' | 'page'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']> = {
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = {
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auth?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['CommentsResponse'], ParentType, ContextType, RequireFields<QueryCommentsArgs, 'limit' | 'orderBy' | 'page'>>;
  favorites?: Resolver<ResolversTypes['FavoritesResponse'], ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'limit' | 'orderBy' | 'page'>>;
  post?: Resolver<Maybe<ResolversTypes['PostResponse']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostsResponse'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'limit' | 'orderBy' | 'page'>>;
  relatedPosts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<QueryRelatedPostsArgs, 'postId'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes['CommentsResponse']>, ParentType, ContextType, RequireFields<UserCommentsArgs, 'limit' | 'orderBy' | 'page'>>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  favoriteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['FavoritesResponse']>, ParentType, ContextType, RequireFields<UserFavoritesArgs, 'limit' | 'orderBy' | 'page'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts?: Resolver<Maybe<ResolversTypes['PostsResponse']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'limit' | 'orderBy' | 'page'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};
