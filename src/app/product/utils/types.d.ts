export type ButtonType = {
  title: string;
  styleType: "primary" | "secondary" | "tertiary";
  modalName: string;
  isVisible: boolean;
};

export type FormValues = {
  productId: number;
  images: string[];
  rating: number;
  content: string;
  uploadImageList: { blob: Blob; source: string }[];
};

export type CoupangProduct = {
  title: string;
  image: string;
  price: string;
  link: string;
  rocketShippingImage: string | null;
  rocketGlobalImage: string | null;
};

export type NaverProduct = {
  title: string;
  image: string;
  price: string;
  link: string;
};
