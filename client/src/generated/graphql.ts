import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
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
  register: Scalars['Boolean'];
  login: Auth;
  logout: Scalars['Boolean'];
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
  createFavorite?: Maybe<FavoriteResponse>;
  deleteFavorite?: Maybe<FavoriteResponse>;
  createPost: Post;
  updatePost: Post;
  deletePost: Post;
  updateUser: User;
  deleteUser: User;
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  body: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateFavoriteArgs = {
  postId: Scalars['Int'];
};


export type MutationDeleteFavoriteArgs = {
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  file: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
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
  posts: PostsResponse;
  post?: Maybe<PostResponse>;
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


export type QueryPostsArgs = {
  userId?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrderByInput>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
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

export type CommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'body' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatarUrl'>
  ) }
);

export type FavoritesFragment = (
  { __typename?: 'FavoritesResponse' }
  & Pick<FavoritesResponse, 'prevPage' | 'nextPage'>
  & { results: Array<(
    { __typename?: 'Favorite' }
    & Pick<Favorite, 'id' | 'createdAt'>
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'imageUrl'>
    ) }
  )> }
);

export type PostDetailsFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'body' | 'imageUrl' | 'createdAt' | 'favoriteCount' | 'commentCount'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatarUrl'>
  ) }
);

export type PostSummaryFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'imageUrl'>
);

export type PostsFragment = (
  { __typename?: 'PostsResponse' }
  & Pick<PostsResponse, 'prevPage' | 'nextPage'>
  & { results: Array<(
    { __typename?: 'Post' }
    & PostSummaryFragment
  )> }
);

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { comment: (
    { __typename?: 'Comment' }
    & CommentFragment
  ) }
);

export type CreateFavoriteMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type CreateFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { favorite?: Maybe<(
    { __typename?: 'FavoriteResponse' }
    & Pick<FavoriteResponse, 'count'>
    & { result: (
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'id'>
    ) }
  )> }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  file: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Post' }
    & PostDetailsFragment
  ) }
);

export type DeleteFavoriteMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeleteFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { favorite?: Maybe<(
    { __typename?: 'FavoriteResponse' }
    & Pick<FavoriteResponse, 'count'>
    & { result: (
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'id'>
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { auth: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'username' | 'avatarUrl' | 'confirmed'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { isLoggedOut: Mutation['logout'] }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registered: Mutation['register'] }
);

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = (
  { __typename?: 'Query' }
  & { auth?: Maybe<(
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'username' | 'avatarUrl' | 'confirmed'>
  )> }
);

export type CommentsQueryVariables = Exact<{
  postId?: Maybe<Scalars['Int']>;
  field?: CommentSortField;
  direction?: SortDirection;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: (
    { __typename?: 'CommentsResponse' }
    & Pick<CommentsResponse, 'nextPage'>
    & { results: Array<(
      { __typename?: 'Comment' }
      & CommentFragment
    )> }
  ) }
);

export type FavoritesQueryVariables = Exact<{
  postId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  field?: FavoriteSortField;
  direction?: SortDirection;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type FavoritesQuery = (
  { __typename?: 'Query' }
  & { favorites: (
    { __typename?: 'FavoritesResponse' }
    & FavoritesFragment
  ) }
);

export type FeaturedQueryVariables = Exact<{
  field: PostSortField;
  direction: SortDirection;
  limit?: Maybe<Scalars['Int']>;
}>;


export type FeaturedQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsResponse' }
    & { results: Array<(
      { __typename?: 'Post' }
      & PostDetailsFragment
    )> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'PostResponse' }
    & Pick<PostResponse, 'isFavorite'>
    & { result: (
      { __typename?: 'Post' }
      & PostDetailsFragment
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  userId?: Maybe<Scalars['Int']>;
  field?: PostSortField;
  direction?: SortDirection;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsResponse' }
    & PostsFragment
  ) }
);

export type RelatedPostsQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type RelatedPostsQuery = (
  { __typename?: 'Query' }
  & { relatedPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'imageUrl'>
  )>> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatarUrl' | 'postCount' | 'favoriteCount' | 'createdAt'>
    & { posts?: Maybe<(
      { __typename?: 'PostsResponse' }
      & PostsFragment
    )>, favorites?: Maybe<(
      { __typename?: 'FavoritesResponse' }
      & FavoritesFragment
    )> }
  ) }
);

export const CommentFragmentDoc = `
    fragment comment on Comment {
  id
  body
  user {
    id
    username
    avatarUrl
  }
  createdAt
}
    `;
export const FavoritesFragmentDoc = `
    fragment favorites on FavoritesResponse {
  results {
    id
    post {
      id
      title
      imageUrl
    }
    createdAt
  }
  prevPage
  nextPage
}
    `;
export const PostDetailsFragmentDoc = `
    fragment postDetails on Post {
  id
  title
  body
  imageUrl
  createdAt
  user {
    id
    username
    avatarUrl
  }
  favoriteCount
  commentCount
}
    `;
export const PostSummaryFragmentDoc = `
    fragment postSummary on Post {
  id
  title
  imageUrl
}
    `;
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
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>
    ) => 
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables)(),
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
      options?: UseMutationOptions<CreateFavoriteMutation, TError, CreateFavoriteMutationVariables, TContext>
    ) => 
    useMutation<CreateFavoriteMutation, TError, CreateFavoriteMutationVariables, TContext>(
      (variables?: CreateFavoriteMutationVariables) => fetcher<CreateFavoriteMutation, CreateFavoriteMutationVariables>(client, CreateFavoriteDocument, variables)(),
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
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>
    ) => 
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables)(),
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
      options?: UseMutationOptions<DeleteFavoriteMutation, TError, DeleteFavoriteMutationVariables, TContext>
    ) => 
    useMutation<DeleteFavoriteMutation, TError, DeleteFavoriteMutationVariables, TContext>(
      (variables?: DeleteFavoriteMutationVariables) => fetcher<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(client, DeleteFavoriteDocument, variables)(),
      options
    );
export const LoginDocument = `
    mutation login($username: String!, $password: String!, $avatarUrl: String) {
  auth: login(username: $username, password: $password, avatarUrl: $avatarUrl) {
    id
    username
    avatarUrl
    confirmed
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
    ) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables)(),
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
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>
    ) => 
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables)(),
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
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>
    ) => 
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables)(),
      options
    );
export const AuthDocument = `
    query auth {
  auth {
    id
    username
    avatarUrl
    confirmed
  }
}
    `;
export const useAuthQuery = <
      TData = AuthQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: AuthQueryVariables, 
      options?: UseQueryOptions<AuthQuery, TError, TData>
    ) => 
    useQuery<AuthQuery, TError, TData>(
      ['auth', variables],
      fetcher<AuthQuery, AuthQueryVariables>(client, AuthDocument, variables),
      options
    );
useAuthQuery.document = AuthDocument;

useAuthQuery.getKey = (variables?: AuthQueryVariables) => ['auth', variables];

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
      options?: UseQueryOptions<CommentsQuery, TError, TData>
    ) => 
    useQuery<CommentsQuery, TError, TData>(
      ['comments', variables],
      fetcher<CommentsQuery, CommentsQueryVariables>(client, CommentsDocument, variables),
      options
    );
useCommentsQuery.document = CommentsDocument;

useCommentsQuery.getKey = (variables?: CommentsQueryVariables) => ['comments', variables];

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
      options?: UseQueryOptions<FavoritesQuery, TError, TData>
    ) => 
    useQuery<FavoritesQuery, TError, TData>(
      ['favorites', variables],
      fetcher<FavoritesQuery, FavoritesQueryVariables>(client, FavoritesDocument, variables),
      options
    );
useFavoritesQuery.document = FavoritesDocument;

useFavoritesQuery.getKey = (variables?: FavoritesQueryVariables) => ['favorites', variables];

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
      options?: UseQueryOptions<FeaturedQuery, TError, TData>
    ) => 
    useQuery<FeaturedQuery, TError, TData>(
      ['featured', variables],
      fetcher<FeaturedQuery, FeaturedQueryVariables>(client, FeaturedDocument, variables),
      options
    );
useFeaturedQuery.document = FeaturedDocument;

useFeaturedQuery.getKey = (variables: FeaturedQueryVariables) => ['featured', variables];

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
      options?: UseQueryOptions<PostQuery, TError, TData>
    ) => 
    useQuery<PostQuery, TError, TData>(
      ['post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables),
      options
    );
usePostQuery.document = PostDocument;

usePostQuery.getKey = (variables: PostQueryVariables) => ['post', variables];

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
      options?: UseQueryOptions<PostsQuery, TError, TData>
    ) => 
    useQuery<PostsQuery, TError, TData>(
      ['posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables),
      options
    );
usePostsQuery.document = PostsDocument;

usePostsQuery.getKey = (variables?: PostsQueryVariables) => ['posts', variables];

export const RelatedPostsDocument = `
    query relatedPosts($postId: Int!) {
  relatedPosts(postId: $postId) {
    id
    title
    imageUrl
  }
}
    `;
export const useRelatedPostsQuery = <
      TData = RelatedPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: RelatedPostsQueryVariables, 
      options?: UseQueryOptions<RelatedPostsQuery, TError, TData>
    ) => 
    useQuery<RelatedPostsQuery, TError, TData>(
      ['relatedPosts', variables],
      fetcher<RelatedPostsQuery, RelatedPostsQueryVariables>(client, RelatedPostsDocument, variables),
      options
    );
useRelatedPostsQuery.document = RelatedPostsDocument;

useRelatedPostsQuery.getKey = (variables: RelatedPostsQueryVariables) => ['relatedPosts', variables];

export const UserDocument = `
    query user($id: Int!) {
  user(id: $id) {
    id
    username
    avatarUrl
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
    ${PostsFragmentDoc}
${FavoritesFragmentDoc}`;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: UserQueryVariables, 
      options?: UseQueryOptions<UserQuery, TError, TData>
    ) => 
    useQuery<UserQuery, TError, TData>(
      ['user', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables),
      options
    );
useUserQuery.document = UserDocument;

useUserQuery.getKey = (variables: UserQueryVariables) => ['user', variables];
