/* eslint-disable react/require-default-props */
import { Ranking } from "@/components/Chip/Ranking";
import { UserImage } from "@/components/UserImage";
import { Rating } from "@/components/UserItem/Rating";
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
  // 리뷰, 팔로워 값이 0일 경우를 대비한 조건 추가
  const formattedFollowersCount =
    String(followersCount) && followersCount !== undefined ? formatNumber(followersCount) : "";
  const formattedReviewCount = String(reviewCount) && reviewCount !== undefined ? formatNumber(reviewCount) : "";

  const formattedNickname = nickname.length > 7 ? `${nickname.slice(0, 6)}...` : nickname;

  return (
    <div className={styles.container}>
      <UserImage
        size='small'
        nickname={nickname}
        image={image}
      />
      <div className={styles.detailBox}>
        <div className={styles.userTitle}>
          {rank ? <Ranking>{String(rank)}</Ranking> : null}
          <span className={styles.userNickname}>{formattedNickname}</span>
        </div>
        <div className={styles.userDesc}>
          {!rating && String(followersCount) && String(reviewCount) ? (
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
