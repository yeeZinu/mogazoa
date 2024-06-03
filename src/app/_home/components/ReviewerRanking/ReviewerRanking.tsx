import Link from "next/link";
import { UserItem } from "@/components/UserItem";
import cn from "@/utils/classNames";
import styles from "./ReviewerRanking.module.scss";
import type { UserRankingType } from "@/types/global";

type ReviewerRankingProps = {
  ranking: UserRankingType[];
};

export default function ReviewerRanking({ ranking }: ReviewerRankingProps) {
  return (
    <div className={cn(styles.container)}>
      <h3 className={cn(styles.header)}>리뷰어 랭킹</h3>
      <div className={cn(styles.ranking)}>
        <div className={cn(styles.rankingBox)}>
          {ranking.map((item, index) => (
            <Link
              href={`/user/${item.id}`}
              key={item.id}
            >
              <UserItem
                image={item.image}
                nickname={item.nickname}
                followersCount={item.followersCount}
                reviewCount={item.reviewCount}
                rank={index + 1}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
