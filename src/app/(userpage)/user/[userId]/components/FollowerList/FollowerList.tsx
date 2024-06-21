import Link from "next/link";
import React from "react";
import { UserImage } from "@/components/UserImage";
import { FollowersList } from "@/types/global";
import cn from "@/utils/classNames";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import styles from "./FollowerList.module.scss";

type FollowListProps = {
  followData: FollowersList[];
  lastRef: () => void;
};

export default function FollowerList({ followData, lastRef }: FollowListProps) {
  return (
    <div className={cn(styles.container)}>
      {followData.map((item, idx) => (
        <Link
          href={`/user/${item.follower.id}`}
          key={item.id}
          className={cn(styles.listBox)}
        >
          <UserImage
            image={item.follower.image === null ? `${DEFAULT_PROFILE_IMAGE}` : item.follower.image}
            nickname={item.follower.nickname}
            size='small'
          />
          <span>{item.follower.nickname}</span>
          <div ref={idx === followData.length - 1 ? lastRef : null} />
        </Link>
      ))}
    </div>
  );
}
