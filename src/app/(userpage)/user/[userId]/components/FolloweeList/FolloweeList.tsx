import Link from "next/link";
import React from "react";
import { UserImage } from "@/components/UserImage";
import { FolloweesList } from "@/types/global";
import cn from "@/utils/classNames";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import styles from "./FolloweeList.module.scss";

type FollowListProps = {
  followData: FolloweesList[];
  lastRef: () => void;
};

export default function FolloweeList({ followData, lastRef }: FollowListProps) {
  return (
    <div className={cn(styles.container)}>
      {followData.map((item, idx) => (
        <Link
          href={`/user/${item.followee.id}`}
          key={item.id}
          className={cn(styles.listBox)}
        >
          <UserImage
            image={item.followee.image === null ? `${DEFAULT_PROFILE_IMAGE}` : item.followee.image}
            nickname={item.followee.nickname}
            size='small'
          />
          <span>{item.followee.nickname}</span>
          <div ref={idx === followData.length - 1 ? lastRef : null} />
        </Link>
      ))}
    </div>
  );
}
