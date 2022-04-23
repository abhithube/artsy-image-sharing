import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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
  avatarUrl: Scalars['String'];
  confirmed: Scalars['Boolean'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

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

export type AuthFragment = { __typename?: 'Auth', id: number, username: string, avatarUrl: string, confirmed: boolean };

export type CommentFragment = { __typename?: 'Comment', id: number, body: string, createdAt: any, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } };

export type FavoritesFragment = { __typename?: 'FavoritesResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Favorite', id: number, createdAt: any, post: { __typename?: 'Post', id: number, title: string, imageUrl: string } }> };

export type PostDetailsFragment = { __typename?: 'Post', id: number, title: string, imageUrl: string, body?: string | null | undefined, createdAt: any, favoriteCount?: number | null | undefined, commentCount?: number | null | undefined, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } };

export type PostSummaryFragment = { __typename?: 'Post', id: number, title: string, imageUrl: string };

export type PostsFragment = { __typename?: 'PostsResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Post', id: number, title: string, imageUrl: string }> };

export type UserFragment = { __typename?: 'User', id: number, username: string, avatarUrl: string };

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', comment: { __typename?: 'Comment', id: number, body: string, createdAt: any, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } } };

export type CreateFavoriteMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CreateFavoriteMutation = { __typename?: 'Mutation', favorite?: { __typename?: 'FavoriteResponse', count: number, result: { __typename?: 'Favorite', id: number } } | null | undefined };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body?: InputMaybe<Scalars['String']>;
  file: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', post: { __typename?: 'Post', id: number, title: string, imageUrl: string, body?: string | null | undefined, createdAt: any, favoriteCount?: number | null | undefined, commentCount?: number | null | undefined, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } } };

export type DeleteFavoriteMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeleteFavoriteMutation = { __typename?: 'Mutation', favorite?: { __typename?: 'FavoriteResponse', count: number, result: { __typename?: 'Favorite', id: number } } | null | undefined };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  avatar?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'Auth', id: number, username: string, avatarUrl: string, confirmed: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', isLoggedOut: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', registered: boolean };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', auth?: { __typename?: 'Auth', id: number, username: string, avatarUrl: string, confirmed: boolean } | null | undefined };

export type CommentsQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']>;
  field?: CommentSortField;
  direction?: SortDirection;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'CommentsResponse', nextPage?: number | null | undefined, results: Array<{ __typename?: 'Comment', id: number, body: string, createdAt: any, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } }> } };

export type FavoritesQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
  field?: FavoriteSortField;
  direction?: SortDirection;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type FavoritesQuery = { __typename?: 'Query', favorites: { __typename?: 'FavoritesResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Favorite', id: number, createdAt: any, post: { __typename?: 'Post', id: number, title: string, imageUrl: string } }> } };

export type FeaturedQueryVariables = Exact<{
  field: PostSortField;
  direction: SortDirection;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type FeaturedQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', results: Array<{ __typename?: 'Post', id: number, title: string, imageUrl: string, body?: string | null | undefined, createdAt: any, favoriteCount?: number | null | undefined, commentCount?: number | null | undefined, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } }> } };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'PostResponse', isFavorite: boolean, result: { __typename?: 'Post', id: number, title: string, imageUrl: string, body?: string | null | undefined, createdAt: any, favoriteCount?: number | null | undefined, commentCount?: number | null | undefined, user: { __typename?: 'User', id: number, username: string, avatarUrl: string } } } | null | undefined };

export type PostsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  field?: PostSortField;
  direction?: SortDirection;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Post', id: number, title: string, imageUrl: string }> } };

export type RelatedPostsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type RelatedPostsQuery = { __typename?: 'Query', relatedPosts?: Array<{ __typename?: 'Post', id: number, title: string, imageUrl: string }> | null | undefined };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', postCount?: number | null | undefined, favoriteCount?: number | null | undefined, createdAt: any, id: number, username: string, avatarUrl: string, posts?: { __typename?: 'PostsResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Post', id: number, title: string, imageUrl: string }> } | null | undefined, favorites?: { __typename?: 'FavoritesResponse', prevPage?: number | null | undefined, nextPage?: number | null | undefined, results: Array<{ __typename?: 'Favorite', id: number, createdAt: any, post: { __typename?: 'Post', id: number, title: string, imageUrl: string } }> } | null | undefined } };

export const AuthFragmentDoc = `
    fragment auth on Auth {
  id
  username
  avatarUrl
  confirmed
}
    `;
export const UserFragmentDoc = `
    fragment user on User {
  id
  username
  avatarUrl
}
    `;
export const CommentFragmentDoc = `
    fragment comment on Comment {
  id
  body
  user {
    ...user
  }
  createdAt
}
    ${UserFragmentDoc}`;
export const PostSummaryFragmentDoc = `
    fragment postSummary on Post {
  id
  title
  imageUrl
}
    `;
export const FavoritesFragmentDoc = `
    fragment favorites on FavoritesResponse {
  results {
    id
    post {
      ...postSummary
    }
    createdAt
  }
  prevPage
  nextPage
}
    ${PostSummaryFragmentDoc}`;
export const PostDetailsFragmentDoc = `
    fragment postDetails on Post {
  id
  title
  imageUrl
  body
  createdAt
  user {
    ...user
  }
  favoriteCount
  commentCount
}
    ${UserFragmentDoc}`;
export const PostsFragmentDoc = `
    fragment posts on PostsResponse {
  results {
    ...postSummary
  }
  prevPage
  nextPage
}
    ${PostSummaryFragmentDoc}`;
export const CreateCommentDocument = `
    mutation createComment($body: String!, $postId: Int!) {
  comment: createComment(body: $body, postId: $postId) {
    ...comment
  }
}
    ${CommentFragmentDoc}`;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      'createComment',
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    );
export const CreateFavoriteDocument = `
    mutation createFavorite($postId: Int!) {
  favorite: createFavorite(postId: $postId) {
    result {
      id
    }
    count
  }
}
    `;
export const useCreateFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateFavoriteMutation, TError, CreateFavoriteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateFavoriteMutation, TError, CreateFavoriteMutationVariables, TContext>(
      'createFavorite',
      (variables?: CreateFavoriteMutationVariables) => fetcher<CreateFavoriteMutation, CreateFavoriteMutationVariables>(client, CreateFavoriteDocument, variables, headers)(),
      options
    );
export const CreatePostDocument = `
    mutation createPost($title: String!, $body: String, $file: String!) {
  post: createPost(title: $title, body: $body, file: $file) {
    ...postDetails
  }
}
    ${PostDetailsFragmentDoc}`;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      'createPost',
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeleteFavoriteDocument = `
    mutation deleteFavorite($postId: Int!) {
  favorite: deleteFavorite(postId: $postId) {
    result {
      id
    }
    count
  }
}
    `;
export const useDeleteFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteFavoriteMutation, TError, DeleteFavoriteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteFavoriteMutation, TError, DeleteFavoriteMutationVariables, TContext>(
      'deleteFavorite',
      (variables?: DeleteFavoriteMutationVariables) => fetcher<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(client, DeleteFavoriteDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation login($username: String!, $password: String!, $avatar: String) {
  auth: login(username: $username, password: $password, avatar: $avatar) {
    ...auth
  }
}
    ${AuthFragmentDoc}`;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      'login',
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const LogoutDocument = `
    mutation logout {
  isLoggedOut: logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      'logout',
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const RegisterDocument = `
    mutation register($username: String!, $password: String!) {
  registered: register(username: $username, password: $password)
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      'register',
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const AuthDocument = `
    query auth {
  auth {
    ...auth
  }
}
    ${AuthFragmentDoc}`;
export const useAuthQuery = <
      TData = AuthQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: AuthQueryVariables,
      options?: UseQueryOptions<AuthQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AuthQuery, TError, TData>(
      variables === undefined ? ['auth'] : ['auth', variables],
      fetcher<AuthQuery, AuthQueryVariables>(client, AuthDocument, variables, headers),
      options
    );
useAuthQuery.document = AuthDocument;


useAuthQuery.getKey = (variables?: AuthQueryVariables) => variables === undefined ? ['auth'] : ['auth', variables];
;

export const CommentsDocument = `
    query comments($postId: Int, $field: CommentSortField! = CREATED_AT, $direction: SortDirection! = DESC, $limit: Int, $page: Int) {
  comments(
    postId: $postId
    orderBy: {field: $field, direction: $direction}
    limit: $limit
    page: $page
  ) {
    results {
      ...comment
    }
    nextPage
  }
}
    ${CommentFragmentDoc}`;
export const useCommentsQuery = <
      TData = CommentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CommentsQueryVariables,
      options?: UseQueryOptions<CommentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CommentsQuery, TError, TData>(
      variables === undefined ? ['comments'] : ['comments', variables],
      fetcher<CommentsQuery, CommentsQueryVariables>(client, CommentsDocument, variables, headers),
      options
    );
useCommentsQuery.document = CommentsDocument;


useCommentsQuery.getKey = (variables?: CommentsQueryVariables) => variables === undefined ? ['comments'] : ['comments', variables];
;

export const FavoritesDocument = `
    query favorites($postId: Int, $userId: Int, $field: FavoriteSortField! = CREATED_AT, $direction: SortDirection! = DESC, $limit: Int, $page: Int) {
  favorites(
    postId: $postId
    userId: $userId
    orderBy: {field: $field, direction: $direction}
    limit: $limit
    page: $page
  ) {
    ...favorites
  }
}
    ${FavoritesFragmentDoc}`;
export const useFavoritesQuery = <
      TData = FavoritesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FavoritesQueryVariables,
      options?: UseQueryOptions<FavoritesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FavoritesQuery, TError, TData>(
      variables === undefined ? ['favorites'] : ['favorites', variables],
      fetcher<FavoritesQuery, FavoritesQueryVariables>(client, FavoritesDocument, variables, headers),
      options
    );
useFavoritesQuery.document = FavoritesDocument;


useFavoritesQuery.getKey = (variables?: FavoritesQueryVariables) => variables === undefined ? ['favorites'] : ['favorites', variables];
;

export const FeaturedDocument = `
    query featured($field: PostSortField!, $direction: SortDirection!, $limit: Int) {
  posts(orderBy: {field: $field, direction: $direction}, limit: $limit) {
    results {
      ...postDetails
    }
  }
}
    ${PostDetailsFragmentDoc}`;
export const useFeaturedQuery = <
      TData = FeaturedQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FeaturedQueryVariables,
      options?: UseQueryOptions<FeaturedQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FeaturedQuery, TError, TData>(
      ['featured', variables],
      fetcher<FeaturedQuery, FeaturedQueryVariables>(client, FeaturedDocument, variables, headers),
      options
    );
useFeaturedQuery.document = FeaturedDocument;


useFeaturedQuery.getKey = (variables: FeaturedQueryVariables) => ['featured', variables];
;

export const PostDocument = `
    query post($id: Int!) {
  post(id: $id) {
    result {
      ...postDetails
    }
    isFavorite
  }
}
    ${PostDetailsFragmentDoc}`;
export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostQuery, TError, TData>(
      ['post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers),
      options
    );
usePostQuery.document = PostDocument;


usePostQuery.getKey = (variables: PostQueryVariables) => ['post', variables];
;

export const PostsDocument = `
    query posts($userId: Int, $field: PostSortField! = CREATED_AT, $direction: SortDirection! = DESC, $limit: Int, $page: Int) {
  posts(
    userId: $userId
    orderBy: {field: $field, direction: $direction}
    limit: $limit
    page: $page
  ) {
    ...posts
  }
}
    ${PostsFragmentDoc}`;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['posts'] : ['posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );
usePostsQuery.document = PostsDocument;


usePostsQuery.getKey = (variables?: PostsQueryVariables) => variables === undefined ? ['posts'] : ['posts', variables];
;

export const RelatedPostsDocument = `
    query relatedPosts($postId: Int!) {
  relatedPosts(postId: $postId) {
    ...postSummary
  }
}
    ${PostSummaryFragmentDoc}`;
export const useRelatedPostsQuery = <
      TData = RelatedPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: RelatedPostsQueryVariables,
      options?: UseQueryOptions<RelatedPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RelatedPostsQuery, TError, TData>(
      ['relatedPosts', variables],
      fetcher<RelatedPostsQuery, RelatedPostsQueryVariables>(client, RelatedPostsDocument, variables, headers),
      options
    );
useRelatedPostsQuery.document = RelatedPostsDocument;


useRelatedPostsQuery.getKey = (variables: RelatedPostsQueryVariables) => ['relatedPosts', variables];
;

export const UserDocument = `
    query user($id: Int!) {
  user(id: $id) {
    ...user
    posts(limit: 5) {
      ...posts
    }
    postCount
    favorites(limit: 5) {
      ...favorites
    }
    favoriteCount
    createdAt
  }
}
    ${UserFragmentDoc}
${PostsFragmentDoc}
${FavoritesFragmentDoc}`;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserQuery, TError, TData>(
      ['user', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
      options
    );
useUserQuery.document = UserDocument;


useUserQuery.getKey = (variables: UserQueryVariables) => ['user', variables];
;
