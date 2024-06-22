import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import cn from "@/utils/classNames";
import { STAR_ACTIVE_ICON, STAR_ICON } from "@/utils/constant";
import styles from "./Rating.module.scss";

type RatingProps<T extends FieldValues> = { name: Path<T>; setValue: UseFormSetValue<T>; defaultValue?: number };
const STAR_LIST = new Array(5).fill(0).map((_, index) => ({ id: index }));

export default function Rating<T extends FieldValues>({ name, defaultValue = 1, setValue }: RatingProps<T>) {
  const [rating, setRating] = useState(defaultValue - 1);
  const [hoverRating, setHoverRating] = useState<number>(defaultValue - 1);

  const handleClick = (index: number) => {
    setRating(index);
  };
  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(rating);
  };

  useEffect(() => {
    setValue(name, (rating + 1) as PathValue<T, Path<T>>);
  }, [setValue, name, rating]);

  return (
    <div>
      {STAR_LIST.map((star, index) => {
        return (
          <Image
            key={star.id}
            className={cn(styles.image, index > rating && index <= hoverRating && styles.active)}
            src={index <= hoverRating ? STAR_ACTIVE_ICON : STAR_ICON}
            width={30}
            height={30}
            alt='rating'
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}
