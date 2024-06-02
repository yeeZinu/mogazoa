import { UserItem } from "@/components/UserItem";
import cn from "@/utils/classNames";
import styles from "./ReviewerRanking.module.scss";

export default function ReviewerRanking() {
  return (
    <div className={cn(styles.container)}>
      <h3 className={cn(styles.header)}>리뷰어 랭킹</h3>
      <div className={cn(styles.ranking)}>
        <div className={cn(styles.rankingBox)}>
          <UserItem
            image=''
            nickname='닉네임'
            followersCount={2}
            reviewCount={2}
            rank={1}
          />
          <UserItem
            image=''
            nickname='닉네임'
            followersCount={2}
            reviewCount={2}
            rank={2}
          />
          <UserItem
            image=''
            nickname='닉네임'
            followersCount={2}
            reviewCount={2}
            rank={3}
          />
          <UserItem
            image=''
            nickname='닉네임'
            followersCount={2}
            reviewCount={2}
            rank={4}
          />
          <UserItem
            image=''
            nickname='닉네임'
            followersCount={2}
            reviewCount={2}
            rank={5}
          />
        </div>
      </div>
    </div>
  );
}
