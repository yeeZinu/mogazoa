/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import Button from "@/components/Button/Button";
import { UserImage } from "@/components/UserImage";
import styles from "./UserInfo.module.scss";
// eslint-disable-next-line no-restricted-imports
import FollowModal from "../FollowModal/FollowModal";
// eslint-disable-next-line no-restricted-imports
import HTMLContent from "../HTMLContent/HTMLContent";

type UserInfoProps = {
  nickname: string;
  image: string;
  description: string;
  follower: number;
  folloing: number;
  isfollow: boolean;
};

export default function UserInfo({ nickname, image, description, follower, folloing, isfollow }: UserInfoProps) {
  // textarea에서 쓴 줄바꿈 변환해서 서버로 보내기
  // const formattedDescription = description.replace(/\n/g, "<br>")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followModalProps, setFollowModalProps] = useState("");

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
        {isfollow ? (
          <Button
            styleType='tertiary'
            disabled
            className='profile'
          >
            팔로우 취소
          </Button>
        ) : (
          <Button
            styleType='primary'
            disabled={false}
            className='profile'
          >
            팔로우
          </Button>
        )}
      </div>
    </>
  );
}
