type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
};

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "에어팟 프로",
    description: "노이즈 캔슬링이 잘 되는 이어폰",
    image:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000",
    rating: 4.5,
    reviewCount: 100,
    favoriteCount: 1000,
    categoryId: 1,
    createdAt: "2024-04-04T03:55:14.623Z",
    updatedAt: "2024-04-04T03:55:14.623Z",
    writerId: 1,
    isFavorite: false,
    category: {
      id: 1,
      name: "전자제품",
    },
    categoryMetric: {
      rating: 4.5,
      favoriteCount: 1000,
      reviewCount: 100,
    },
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of product 2",
    image: "",
    rating: 4.7,
    reviewCount: 20,
    favoriteCount: 150,
    categoryId: 2,
    createdAt: "",
    updatedAt: "",
    writerId: 0,
    isFavorite: false,
    category: {
      id: 2,
      name: "Category 2",
    },
    categoryMetric: {
      rating: 4.7,
      favoriteCount: 150,
      reviewCount: 20,
    },
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of product 3",
    image: "",
    rating: 4.9,
    reviewCount: 30,
    favoriteCount: 200,
    categoryId: 3,
    createdAt: "",
    updatedAt: "",
    writerId: 0,
    isFavorite: false,
    category: {
      id: 3,
      name: "Category 3",
    },
    categoryMetric: {
      rating: 4.9,
      favoriteCount: 200,
      reviewCount: 30,
    },
  },
];

export type { Product };
