/* eslint-disable react/require-default-props */
import { Rating } from "@/components/Rating";
import { UserImage } from "@/components/UserImage";
import { formatNumber } from "./formatNumbers";
import styles from "./UserItem.module.scss";

type UserItemProps = {
  image: string;
  nickname: string;
  rating?: number;
  followersCount?: number;
  reviewCount?: number;
  rank?: number;
};

export default function UserItem({ image, nickname, rating, followersCount, reviewCount, rank }: UserItemProps) {
  const formattedFollowersCount = followersCount ? formatNumber(followersCount) : "";
  const formattedReviewCount = reviewCount ? formatNumber(reviewCount) : "";

  return (
    <div className={styles.container}>
      <UserImage
        size='small'
        nickname={nickname}
        image={image}
      />
      <div className={styles.detailBox}>
        <div className={styles.userTitle}>
          {rank ? <span style={{ color: "orange" }}>{rank}등</span> : null}
          <span className={styles.userNickname}>{nickname}</span>
        </div>
        <div className={styles.userDesc}>
          {followersCount && reviewCount ? (
            <>
              <div className={styles.userDescItem}>
                <span>팔로워</span>
                <span>{formattedFollowersCount}</span>
              </div>
              <div className={styles.userDescItem}>
                <span>리뷰</span>
                <span>{formattedReviewCount}</span>
              </div>
            </>
          ) : null}
          {rating ? <Rating rating={rating} /> : null}
        </div>
      </div>
    </div>
  );
}
