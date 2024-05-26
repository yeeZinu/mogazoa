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
