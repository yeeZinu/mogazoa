import { CATEGORY_TYPE } from "@/components/Chip/Category-chip/CategoryChip";

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

export type ProductRequestType = {
  name: string;
  image: string;
  description: string;
  categoryId: number;
};

export type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ErrorResponse = {
  message: string;
  details: {
    name: {
      message: string;
      value: string;
    };
  };
} 
  
export type ProductDetailType = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  description: string;
  category: { id: number; name: keyof typeof CATEGORY_TYPE };
  isFavorite: boolean;
  favoriteCount: number;
  categoryMetric: { rating: number; reviewCount: number; favoriteCount: number };
};

export type ReviewType = {
  user: { image: string; nickname: string; id: number };
  reviewImages: { source: string; id: number }[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
};
