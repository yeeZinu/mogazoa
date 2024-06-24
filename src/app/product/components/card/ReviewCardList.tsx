"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";
import { ReviewType } from "@/types/global";
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from "@/utils/constant";
import HttpClient from "@/utils/httpClient";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.scss";

const VIEW_COUNT = 6;

export default function ReviewCardList({
  initialReviews,
  session,
  productId,
  initialCursor,
  reviewCount,
}: {
  initialReviews: ReviewType[];
  session: Session | null;
  productId: string;
  initialCursor: number | null;
  reviewCount: number;
}) {
  const [reviewList, setReviewList] = useState<ReviewType[]>(initialReviews);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(reviewCount / VIEW_COUNT) - 1;

  const loadMoreReviews = async () => {
    try {
      const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL || "");
      const { list: newReviews, nextCursor } = await httpClient.get<{ list: ReviewType[]; nextCursor: number | null }>(
        `/products/${productId}/reviews?cursor=${cursor}`,
        {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      );

      setCursor(nextCursor);
      setReviewList((prevReviews) => [...prevReviews, ...newReviews]);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  };

  const handleNextClick = () => {
    const nextPage = page + 1;
    if (page % 2 !== 0) {
      loadMoreReviews();
    }
    setPage(nextPage);
  };

  const handlePrevClick = () => {
    const prevPage = page - 1;
    if (page > 0) {
      setPage(prevPage);
    }
  };

  const startIdx = page * VIEW_COUNT;
  const endIdx = startIdx + VIEW_COUNT;

  return (
    <div>
      <ul className={styles.layout}>
        {reviewList.slice(startIdx, endIdx).map((review) => (
          <li key={review.id}>
            <ReviewCard
              review={review}
              session={session}
            />
          </li>
        ))}
      </ul>
      <div className={styles.buttonBox}>
        {page > 0 && (
          <Image
            className={styles.prev}
            onClick={handlePrevClick}
            src={ARROW_LEFT_ICON}
            alt='previous'
            width={45}
            height={45}
          />
        )}
        {page < maxPage && (
          <Image
            className={styles.next}
            onClick={handleNextClick}
            src={ARROW_RIGHT_ICON}
            alt='next'
            width={45}
            height={45}
          />
        )}
      </div>
    </div>
  );
}
