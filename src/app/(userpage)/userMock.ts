import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";

export const userMock = {
  updatedAt: "2024-06-03T10:18:50.930Z",
  createdAt: "2024-06-03T10:18:50.930Z",
  teamId: "string",
  image: `${DEFAULT_PROFILE_IMAGE}`,
  description: "string",
  nickname: "string",
  id: 1,
  mostFavoriteCategory: {
    name: "전자기기",
    id: 1,
  },
  averageRating: 0,
  reviewCount: 0,
  followeesCount: 0,
  followersCount: 0,
  isFollowing: true,
};

export const followMock = {
  nextCursor: 0,
  list: [
    {
      updatedAt: "2024-06-03T10:18:50.930Z",
      createdAt: "2024-06-03T10:18:50.930Z",
      writerId: 0,
      categoryId: 1,
      favoriteCount: 13,
      reviewCount: 14,
      rating: 1,
      image: `${DEFAULT_PROFILE_IMAGE}`,
      name: "닝닝한 빠빠씨",
      id: 0,
    },
    {
      updatedAt: "2024-06-03T10:18:50.930Z",
      createdAt: "2024-06-03T10:18:50.930Z",
      writerId: 0,
      categoryId: 1,
      favoriteCount: 13,
      reviewCount: 14,
      rating: 1,
      image: `${DEFAULT_PROFILE_IMAGE}`,
      name: "닝닝한 빠빠씨",
      id: 1,
    },
    {
      updatedAt: "2024-06-03T10:18:50.930Z",
      createdAt: "2024-06-03T10:18:50.930Z",
      writerId: 0,
      categoryId: 1,
      favoriteCount: 13,
      reviewCount: 14,
      rating: 1,
      image: `${DEFAULT_PROFILE_IMAGE}`,
      name: "닝닝한 빠빠씨",
      id: 2,
    },
  ],
};
