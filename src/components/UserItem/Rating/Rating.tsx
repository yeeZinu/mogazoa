import Image from "next/image";
import { STAR_ACTIVE_ICON, STAR_ICON } from "@/utils/constant";
import styles from "./Rating.module.scss";

type RatingProps = {
  rating: number;
};
export default function Rating({ rating }: RatingProps) {
  const normalizedRating = Math.max(0, Math.min(rating, 5)); // 5 이상의 수를 받을 경우를 처리함

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          className={styles.iconBox}
          key={item}
        >
          <Image
            src={item <= normalizedRating ? STAR_ACTIVE_ICON : STAR_ICON}
            fill
            alt='별점'
          />
        </div>
      ))}
    </div>
  );
}
