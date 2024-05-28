export const DROPDOWN = {
  CATEGORY: "category",
  SORT: "sort",
} as const;

export const SORT = {
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
};
