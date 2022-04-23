import { SortOrder } from './constants';
import {
  CommentOrderByInput,
  FavoriteOrderByInput,
  PostOrderByInput,
} from './generated/graphql';

export const parseOrderBy = (
  orderByInput: PostOrderByInput | CommentOrderByInput | FavoriteOrderByInput
) => {
  const direction =
    orderByInput.direction === 'ASC' ? SortOrder.ASC : SortOrder.DESC;
  let orderBy;
  switch (orderByInput.field) {
    case 'TITLE':
      orderBy = { title: direction };
      break;
    case 'FAVORITE_COUNT':
      orderBy = { favorites: { _count: direction } };
      break;
    case 'COMMENT_COUNT':
      orderBy = { favorites: { _count: direction } };
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

  return orderBy;
};
