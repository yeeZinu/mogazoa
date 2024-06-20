"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toggleItem } from "@/app/product/utils/apis";
import Thumbs from "@/components/Chip/Thumbs/Thumbs";
import { UserItem } from "@/components/UserItem";
import { ReviewType } from "@/types/global";
import styles from "./ReviewCard.module.scss";

type ReviewCardProps = { review: ReviewType };

export default function ReviewCard({ review }: ReviewCardProps) {
  const { id, user, isLiked, rating, content, reviewImages, createdAt, likeCount: like } = review;
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const userId = session?.user?.id;
  const isWriter = userId === user.id;

  const [isActive, setIsActive] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(like);

  const handleThumbsClick = async () => {
    if (!userId) {
      console.log("loginmodal");
      return;
    }
    const activeState = await toggleItem(id, isActive, accessToken, "reviews");
    setIsActive(activeState);
    if (activeState) setLikeCount((prev) => prev + 1);
    else setLikeCount((prev) => prev - 1);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.userBox}>
        <UserItem
          image={user.image}
          nickname={user.nickname}
          rating={rating}
        />
      </div>
      <article className={styles.reviewBox}>
        <p className={styles.description}>{content}</p>
        <div className={styles.imageBox}>
          {reviewImages.map((image) => (
            <Image
              key={image.id}
              src={image.source}
              alt='product review'
              width={120}
              height={120}
            />
          ))}
        </div>
        <div className={styles.footerBox}>
          <p className={styles.createdAt}>{createdAt.split("T")[0]}</p>
          <div className={styles.editBox}>
            {isWriter && [
              <button
                key='edit'
                type='button'
              >
                수정
              </button>,
              <button
                key='delete'
                type='button'
              >
                삭제
              </button>,
            ]}
          </div>
          <Thumbs
            isActive={isActive}
            onClick={handleThumbsClick}
          >
            {likeCount}
          </Thumbs>
        </div>
      </article>
    </div>
  );
}
