export type UserType = {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
};

export type UserRankingType = UserType & {
  reviewCount: number;
  followersCount: number;
};

export type ProductType = {
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

export type ProductsResponseType = {
  list: ProductType[];
  nextCursor: number;
};

export type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
