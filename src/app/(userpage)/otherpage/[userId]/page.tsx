"use client";

// import { useParams } from "next/navigation";
import React from "react";
// user mock data
import { userMock } from "@/app/(userpage)/userMock";
import Activity from "@/components/Card/Activity/Activity";
import cn from "@/utils/classNames";
// 추후 데이터 연결시 받아온데이터로 변환 예정
import UserActivityList from "./components/UserActivityList/UserActivityList";
import UserInfo from "./components/UserInfo/UserInfo";
import styles from "./OtherPage.module.scss";

export default function OtherPage() {
  // userId를 받아오는 useParams function
  // const { userId } = useParams<{ userId: string }>();

  return (
    <div className={cn(styles.container)}>
      <UserInfo
        nickname={userMock.nickname}
        image={userMock.image}
        description={userMock.description}
        follower={userMock.followersCount}
        folloing={userMock.followeesCount}
        isfollow={userMock.isFollowing}
      />
      <div className={styles.activity}>
        <section>
          <p className={styles.activityDetailText}>활동 내역</p>
          <div className={styles.activityDetails}>
            <Activity
              title='남긴 별점 평균'
              averageRating={userMock.averageRating}
            />
            <Activity
              title='남긴 리뷰'
              reviewCount={userMock.reviewCount}
            />
            <Activity
              title='관심 카테고리'
              chipCategoty={userMock.mostFavoriteCategory}
            />
          </div>
        </section>
        <UserActivityList />
      </div>
    </div>
  );
}
