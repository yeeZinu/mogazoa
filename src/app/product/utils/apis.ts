import { ReviewType } from "@/types/global";
import HttpClient from "@/utils/httpClient";
import { CoupangProduct, EditFormValues, FormValues, NaverProduct } from "./types";

const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL || "");

export const toggleItem = async (
  id: number,
  isToggle: boolean,
  accessToken: string | undefined,
  item: "reviews" | "products",
): Promise<boolean> => {
  const endPoint = item === "reviews" ? "like" : "favorite";
  try {
    if (isToggle) {
      await httpClient.delete(`/${item}/${id}/${endPoint}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } else {
      await httpClient.post(`/${item}/${id}/${endPoint}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    }
    return !isToggle;
  } catch (error) {
    console.error("Error updating favorite status:", error);
    throw error;
  }
};

const uploadImage = async (image: Blob, accessToken: string | undefined): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await httpClient.post<{ url: string }>(
      "/images/upload",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      formData,
    );

    return response.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image.");
  }
};

export const reviewSubmit = async (data: FormValues, accessToken: string | undefined) => {
  const { uploadImageList, ...restData } = data;
  try {
    const imageUrlList = uploadImageList
      ? await Promise.all(uploadImageList?.map((image) => uploadImage(image.blob, accessToken)))
      : [];

    const bodyData = { ...restData, images: imageUrlList };

    const response = await httpClient.post(
      "/reviews",
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } },
      JSON.stringify(bodyData),
    );
    window.location.reload();
    return response;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw new Error("Failed to submit review.");
  }
};

export const reviewPatch = async (
  data: EditFormValues,
  reviewId: number,
  accessToken: string | undefined,
  originalImageList: { source: string }[],
) => {
  const { uploadImageList, ...restData } = data;
  try {
    const responseImageList = uploadImageList
      ? await Promise.all(uploadImageList?.map((image) => uploadImage(image.blob, accessToken)))
      : [];

    const newImageList = responseImageList?.map((imageUrl) => ({ source: imageUrl }));
    const images = originalImageList.concat(newImageList);

    const bodyData = { ...restData, images };
    const response = await httpClient.patch(
      `/reviews/${reviewId}`,
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } },
      JSON.stringify(bodyData),
    );
    window.location.reload();
    return response;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw new Error("Failed to submit review.");
  }
};

export const deleteReview = async (id: number, accessToken: string | undefined) => {
  try {
    httpClient.delete(`/reviews/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    console.log("Success deleting");
    window.location.reload();
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Failed to delete review.");
  }
};

export const fetchShoppingList = async (
  platform: "coupang" | "naver",
  keyword: string,
): Promise<{ items: CoupangProduct[] } | { itmes: NaverProduct[] }> => {
  const response = await fetch(`http://localhost:3000/api/search/${platform}?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return { items: data.items };
};

export const fetchReviews = async (
  productId: string,
  order: string,
  cursor: number,
  accessToken: string | undefined,
) => {
  const response = await httpClient.get<{ list: ReviewType[]; nextCursor: number | null }>(
    `/products/${productId}/reviews?cursor=${cursor}&order=${order}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response;
};
