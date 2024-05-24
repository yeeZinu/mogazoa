import Image from "next/image";
import cn from "@/utils/classNames";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import styles from "./UserImage.module.scss";

type UserImageProps = {
  /* eslint-disable-next-line react/require-default-props */
  image?: string;
  nickname: string;
  size: "small" | "medium" | "large";
};

export default function UserImage({ image = DEFAULT_PROFILE_IMAGE, nickname, size }: UserImageProps) {
  return (
    <div
      className={cn(
        styles.container,
        size === "small" && styles.small,
        size === "medium" && styles.medium,
        size === "large" && styles.large,
      )}
    >
      <Image
        fill
        alt={`${nickname}'s profile image`}
        src={image}
      />
    </div>
  );
}
