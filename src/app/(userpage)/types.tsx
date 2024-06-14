export type UserDetail = {
  id: number;
  nickname: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  isFollowing: boolean;
  followersCount: number;
  followeesCount: number;
  reviewCount: number;
  averageRating: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
};

export type UserProduct = {
  nextCursor: number;
  list: Follow[];
};

export type Follow = {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
};
