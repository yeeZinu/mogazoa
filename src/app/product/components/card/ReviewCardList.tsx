import { Session } from "next-auth";
import { ReviewType } from "@/types/global";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewCardList.module.scss";

type ReviewCardListProps = { reviewList: ReviewType[]; session: Session | null };

export default function ReviewCardList({ reviewList, session }: ReviewCardListProps) {
  return (
    <ul className={styles.layout}>
      {reviewList.map((review) => (
        <li key={review.id}>
          <ReviewCard
            review={review}
            session={session}
          />
        </li>
      ))}
    </ul>
  );
}
