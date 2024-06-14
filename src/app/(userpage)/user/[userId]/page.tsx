"use client";

/* eslint-disable no-restricted-imports */

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
// user mock data
// import { userMock } from "@/app/(userpage)/userMock";
import Activity from "@/components/Card/Activity/Activity";
import cn from "@/utils/classNames";
// 추후 데이터 연결시 받아온데이터로 변환 예정
import HttpClient from "@/utils/httpClient";
import UserActivityList from "./components/UserActivityList/UserActivityList";
import UserInfo from "./components/UserInfo/UserInfo";
import styles from "./UserPage.module.scss";
import { UserDetail } from "../../types";

export default function UserPage({ params }: { params: { userId: number } }) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserDetail>();

  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL!);

  const getUserData = async () => {
    if (session) {
      const ACCESS_TOKEN = session.accessToken;
      setUserData(
        await httpClient.get(`users/${params.userId}`, {
          headers: { Authorization: ACCESS_TOKEN },
          cache: "no-cache",
        }),
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={cn(styles.container)}>
      {userData && (
        <>
          <UserInfo
            nickname={userData.nickname}
            image={userData.image}
            description={userData.description}
            follower={userData.followersCount}
            folloing={userData.followeesCount}
            isfollow={userData.isFollowing}
          />
          <div className={styles.activity}>
            <section>
              <p className={styles.activityDetailText}>활동 내역</p>
              <div className={styles.activityDetails}>
                <Activity
                  title='남긴 별점 평균'
                  averageRating={userData.averageRating}
                />
                <Activity
                  title='남긴 리뷰'
                  reviewCount={userData.reviewCount}
                />
                <Activity
                  title='관심 카테고리'
                  chipCategoty={userData.mostFavoriteCategory}
                />
              </div>
            </section>
            <UserActivityList />
          </div>
        </>
      )}
    </div>
  );
}
