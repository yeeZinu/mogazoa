export const DROPDOWN = {
  CATEGORY: "category",
  ORDER: "order",
} as const;

export const ORDER = {
  PRODUCT: [
    {
      value: "recent",
      option: "최신순",
    },
    {
      value: "rating",
      option: "별점순",
    },
    {
      value: "reviewCount",
      option: "리뷰순",
    },
  ],
  REVIEW: [
    {
      value: "recent",
      option: "최신순",
    },
    {
      value: "ratingDesc",
      option: "별점 높은순",
    },
    {
      value: "ratingAsc",
      option: "별점 낮은순",
    },
    {
      value: "likeCount",
      option: "좋아요순",
    },
  ],
  PROFILE: [
    {
      value: "reviewed",
      option: "리뷰 남긴 상품",
    },
    {
      value: "created",
      option: "등록한 상품",
    },
    {
      value: "favorite",
      option: "찜한 상품",
    },
  ],
};
