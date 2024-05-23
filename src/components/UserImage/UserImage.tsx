import Image from "next/image";
import cn from "@/utils/classNames";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import styles from "./UserImage.module.scss";

type UserImageProps = {
  /* eslint-disable-next-line react/require-default-props */
  image?: string;
  nickname: string;
  type: "USER_PROFILE" | "PROFILE_RANK" | "PROFILE_LIST";
};

export default function UserImage({ image = DEFAULT_PROFILE_IMAGE, nickname, type }: UserImageProps) {
  return (
    <div
      className={cn(
        styles.container,
        type === "USER_PROFILE" && styles.userProfile,
        type === "PROFILE_RANK" && styles.userRank,
        type === "PROFILE_LIST" && styles.userFollowList,
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
