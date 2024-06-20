import { ReviewType } from "@/types/global";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.scss";

type ReviewCardListProps = { reviewList: ReviewType[] };

export default function ReviewCardList({ reviewList }: ReviewCardListProps) {
  return (
    <ul className={styles.layout}>
      {reviewList.map((review) => (
        <li key={review.id}>
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
