import { PostDetails } from './interfaces';

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum PostSortField {
  CommentCount = 'COMMENT_COUNT',
  CreatedAt = 'CREATED_AT',
  FavoriteCount = 'FAVORITE_COUNT',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
}

export type PostResponse = {
  post: {
    result: PostDetails;
    isFavorite: boolean;
  };
};

export type PostVars = {
  id: number;
};

export type FeaturedResponse = {
  posts: {
    results: PostDetails[];
  };
};

export type FeaturedVars = {
  field: PostSortField;
  direction: SortDirection;
  limit: number;
};
