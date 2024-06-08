export type UserDetail = {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
};

export type UserProduct = {
  nextCursor: number;
  list: [
    {
      updatedAt: Date;
      createdAt: Date;
      writerId: number;
      categoryId: number;
      favoriteCount: number;
      reviewCount: number;
      rating: number;
      image: string;
      name: string;
      id: number;
    },
  ];
};
