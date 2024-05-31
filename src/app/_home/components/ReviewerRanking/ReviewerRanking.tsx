import cn from "@/utils/classNames";
import styles from "./ReviewerRanking.module.scss";

export default function ReviewerRanking() {
  return (
    <div className={cn(styles.container)}>
      <h3 className={cn(styles.header)}>리뷰어 랭킹</h3>
      <div className={cn(styles.ranking)}>
        <div className={cn(styles.rankingBox)}>
          <div className={cn(styles.item)}>리뷰어</div>
          <div className={cn(styles.item)}>리뷰어</div>
          <div className={cn(styles.item)}>리뷰어</div>
          <div className={cn(styles.item)}>리뷰어</div>
          <div className={cn(styles.item)}>리뷰어</div>
        </div>
      </div>
    </div>
  );
}
