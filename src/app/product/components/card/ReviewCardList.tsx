"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ReviewListSkeleton from "@/app/product/components/skeleton/ReviewListSkeleton";
import { fetchReviews } from "@/app/product/utils/apis";
import { Dropdown } from "@/components/Dropdown";
import { DROPDOWN, ORDER } from "@/components/Dropdown/constants";
import { ReviewType } from "@/types/global";
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from "@/utils/constant";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.scss";

const VIEW_COUNT = 6;

export default function ReviewCardList({
  session,
  productId,
  reviewCount,
}: {
  session: Session | null;
  productId: string;
  reviewCount: number;
}) {
  const { control } = useForm({ mode: "onBlur" });
  const order = useWatch({ control, name: "order" }) || "recent";
  const maxPage = Math.ceil(reviewCount / VIEW_COUNT) - 1;

  const { data: reviewsData } = useSuspenseQuery({
    queryKey: ["reviews", productId, order, 0],
    queryFn: () => fetchReviews(productId, order, 0, session?.accessToken),
  });

  const [reviewList, setReviewList] = useState<ReviewType[]>(reviewsData.list);
  const [cursor, setCursor] = useState<number | null>(reviewsData.nextCursor);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreReviews = useCallback(
    async (reviewOrder: string, reviewCursor: number, newFetch: boolean = false) => {
      setIsLoading(true);
      try {
        const { list: newReviews, nextCursor } = await fetchReviews(
          productId,
          reviewOrder,
          reviewCursor,
          session?.accessToken,
        );
        setCursor(nextCursor);
        if (newFetch) {
          setReviewList(newReviews);
          return;
        }
        setReviewList((prevReviews) => [...prevReviews, ...newReviews]);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [productId, session],
  );

  useEffect(() => {
    setCursor(0);
    setPage(0);
    setReviewList([]);
    loadMoreReviews(order, 0, true);
  }, [order, loadMoreReviews]);

  const handleNextClick = () => {
    const nextPage = page + 1;
    if (page < Math.floor(maxPage / 2)) {
      loadMoreReviews(order, cursor || 0);
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

  if (isLoading) {
    return <ReviewListSkeleton reviewCount={reviewCount} />;
  }
  return (
    <div>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>상품 리뷰</h2>
        <Dropdown
          className={styles.dropDown}
          items={ORDER.REVIEW}
          control={control}
          name='order'
          variant={DROPDOWN.ORDER}
          placeholder={ORDER.REVIEW[0].option}
        />
      </div>

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
