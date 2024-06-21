/* eslint-disable no-nested-ternary */
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FolloweeList from "@/app/(userpage)/user/[userId]/components/FolloweeList/FolloweeList";
import FollowerList from "@/app/(userpage)/user/[userId]/components/FollowerList/FollowerList";
import { useFollowees, useFollowers } from "@/app/(userpage)/user/[userId]/hooks/useGetFollow";
import Modal from "@/components/Modal/Modal";
import { FolloweesList, FollowersList } from "@/types/global";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./FollowModal.module.scss";

type ModalProps = {
  userId: number;
  followState: string;
  isModalState: boolean;
  setIsModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FollowModal({ userId, isModalState, setIsModalState, followState }: ModalProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const handleClose = () => setIsModalState(false);

  // 팔로워 데이터
  const {
    data: followerData,
    fetchNextPage: fetchNextFollowers,
    hasNextPage: hasNextFolloweres,
  } = useFollowers(userId);

  useEffect(() => {
    if (inView && hasNextFolloweres) {
      fetchNextFollowers();
    }
  }, [inView, fetchNextFollowers, hasNextFolloweres]);

  // 팔로잉 데이터
  const {
    data: followeeData,
    fetchNextPage: fetchNextFollowees,
    hasNextPage: hasNextFolloweees,
  } = useFollowees(userId);

  console.log("followeeData", followeeData);

  useEffect(() => {
    if (inView && hasNextFolloweees) {
      fetchNextFollowees();
    }
  }, [inView, fetchNextFollowees, hasNextFolloweees]);

  let followProps;
  if (followState === "followers") {
    followProps = followerData;
  } else {
    followProps = followeeData;
  }
  return (
    <>
      {followProps !== undefined && isModalState && (
        <Modal onClose={handleClose}>
          <div className={cn(styles.container)}>
            <div
              className={cn(styles.closeButton)}
              onClick={handleClose}
              onKeyDown={handleClose}
              role='button'
              tabIndex={0}
            >
              <Image
                src={CLOSE_ICON}
                alt='닫기버튼'
                fill
              />
            </div>
            <h1> 팔로{followState === "followees" ? "잉" : "우"} 하는 유저</h1>
            {followProps.length < 1 ? (
              <div className={cn(styles.noFollowBox)}>팔로우하는 유저가 없어요</div>
            ) : followState === "followees" ? (
              <FolloweeList
                followData={followProps as FolloweesList[]}
                lastRef={ref}
              />
            ) : (
              <FollowerList
                followData={followProps as FollowersList[]}
                lastRef={ref}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
