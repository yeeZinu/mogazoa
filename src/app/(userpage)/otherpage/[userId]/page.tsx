"use client";

// import { useParams } from "next/navigation";
import React from "react";
import cn from "@/utils/classNames";
// 추후 데이터 연결시 받아온데이터로 변환 예정
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constant";
import UserInfo from "./components/UserInfo/UserInfo";
import styles from "./OtherPage.module.scss";

export default function OtherPage() {
  // userId를 받아오는 useParams function
  // const { userId } = useParams<{ userId: string }>();

  return (
    <div className={cn(styles.container)}>
      <UserInfo
        nickname='surisuri마수리' // userId 도 나중에 nickname으로 변경 예정
        image={DEFAULT_PROFILE_IMAGE}
        description='세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도 프로쇼핑러! <br>
        안녕하세요, 별점의 화신 surisuri마수리입니다'
        follower={762}
        folloing={102}
        isfollow={false}
      />
    </div>
  );
}
