"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import LoginModal from "@/app/product/components/modal/LoginModal";
import ReviewEditModal from "@/app/product/components/modal/ReviewEditModal";
import WithModal from "@/app/product/components/with-modal/WithModal";
import { deleteReview, toggleItem } from "@/app/product/utils/apis";
import Thumbs from "@/components/Chip/Thumbs/Thumbs";
import { UserItem } from "@/components/UserItem";
import { ReviewType } from "@/types/global";
import cn from "@/utils/classNames";
import styles from "./ReviewCard.module.scss";

type ReviewCardProps = { review: ReviewType; session: Session | null };

export default function ReviewCard({ review, session }: ReviewCardProps) {
  const { id, user, isLiked, rating, content, reviewImages, createdAt, likeCount: like } = review;
  const [showEditModal, setShowEditModal] = useState(false);
  const accessToken = session?.accessToken;
  const userId = session?.user?.id;
  const isWriter = userId === user.id;
  const contentRef = useRef(null);

  const [isActive, setIsActive] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(like);
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleThumbsClick = async () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    const activeState = await toggleItem(id, isActive, accessToken, "reviews");
    setIsActive(activeState);
    if (activeState) setLikeCount((prev) => prev + 1);
    else setLikeCount((prev) => prev - 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target.scrollHeight > entry.target.clientHeight) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [review]);

  return (
    <div className={styles.layout}>
      <div className={styles.mainBox}>
        <div className={styles.userBox}>
          <UserItem
            image={user.image}
            nickname={user.nickname}
            rating={rating}
          />
          <p
            className={cn(isExpanded ? styles.expand : styles.description)}
            ref={contentRef}
          >
            {content}
          </p>
          {showButton && (
            <button
              type='button'
              className={styles.expandButton}
              onClick={toggleExpand}
            >
              {isExpanded ? "접기" : "...더보기"}
            </button>
          )}
        </div>
        <div className={styles.imageBox}>
          {reviewImages.length ? (
            reviewImages.map((image, index) => (
              <Image
                className={styles.reviewImage}
                key={image.id}
                src={image.source}
                alt='product review'
                width={120}
                height={120}
                style={{ zIndex: 20 - index }}
              />
            ))
          ) : (
            <p className={styles.noneImage}> </p>
          )}
        </div>
      </div>
      <footer className={styles.footerBox}>
        <p className={styles.createdAt}>{createdAt.split("T")[0]}</p>
        <div className={styles.editBox}>
          {isWriter && [
            <button
              key='edit'
              type='button'
              onClick={() => setShowEditModal(true)}
            >
              수정
            </button>,
            <button
              key='delete'
              type='button'
              onClick={() => deleteReview(id, accessToken)}
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
      </footer>
      {showEditModal && (
        <WithModal onClose={() => setShowEditModal(false)}>
          <ReviewEditModal review={review} />
        </WithModal>
      )}
      {showLoginModal && (
        <WithModal onClose={() => setShowLoginModal(false)}>
          <LoginModal />
        </WithModal>
      )}
    </div>
  );
}
