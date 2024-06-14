import Link from "next/link";
import React from "react";
import { UserProduct } from "@/app/(userpage)/types";
import { UserImage } from "@/components/UserImage";
import cn from "@/utils/classNames";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import styles from "./FollowList.module.scss";

type FollowListProps = {
  followData: UserProduct;
};

export default function FollowList({ followData }: FollowListProps) {
  console.log(followData);

  return (
    <div className={cn(styles.container)}>
      {followData.list.map((item) => (
        <Link
          href={`/user/${item.id}`}
          key={item.id}
          className={cn(styles.listBox)}
        >
          <UserImage
            image={item.image === null ? `${DEFAULT_PROFILE_IMAGE}` : item.image}
            nickname={item.name}
            size='small'
          />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
