/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Button from "@/components/Button/Button";
import { UserImage } from "@/components/UserImage";
import styles from "./UserInfo.module.scss";
// eslint-disable-next-line no-restricted-imports
import FollowModal from "../FollowModal/FollowModal";
// eslint-disable-next-line no-restricted-imports
import HTMLContent from "../HTMLContent/HTMLContent";
// eslint-disable-next-line no-restricted-imports
import MyProfileButton from "../MyProfileButton/MyProfileButton";

type UserInfoProps = {
  userId: number;
  nickname: string;
  image: string;
  description: string;
  follower: number;
  folloing: number;
  isfollow: boolean;
};

export default function UserInfo({
  userId,
  nickname,
  image,
  description,
  follower,
  folloing,
  isfollow,
}: UserInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followModalProps, setFollowModalProps] = useState("");
  const { data: session } = useSession();
  const loginUser = session?.user.id;

  const handelFolloweesModal = () => {
    setFollowModalProps("followees");
    setIsModalOpen(true);
  };

  const handelFollowersModal = () => {
    setFollowModalProps("followers");
    setIsModalOpen(true);
  };

  return (
    <>
      <FollowModal
        followState={followModalProps}
        isModalState={isModalOpen}
        setIsModalState={setIsModalOpen}
      />
      <div className={styles.container}>
        <UserImage
          image={image}
          nickname={nickname}
          size='large'
        />
        <div className={styles.descriptionBox}>
          <p>{nickname}</p>
          <HTMLContent html={description} />
        </div>
        <div className={styles.followBox}>
          <div onClick={handelFollowersModal}>
            <p>{follower}</p>
            <p>팔로워</p>
          </div>
          <div onClick={handelFolloweesModal}>
            <p>{folloing}</p>
            <p>팔로잉</p>
          </div>
        </div>
        {Number(userId) === loginUser ? (
          <MyProfileButton />
        ) : (
          <div className={styles.followButton}>
            {isfollow ? (
              <Button
                styleType='tertiary'
                disabled
                className={styles.profile}
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                styleType='primary'
                disabled={false}
                className={styles.profile}
              >
                팔로우
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
