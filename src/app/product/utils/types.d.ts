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
