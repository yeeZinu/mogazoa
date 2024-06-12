import React from "react";
import Button from "@/components/Button/Button";
import { UserImage } from "@/components/UserImage";
import styles from "./UserInfo.module.scss";
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

  return (
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
        <div>
          <p>{follower}</p>
          <p>팔로워</p>
        </div>
        <div>
          <p>{folloing}</p>
          <p>팔로잉</p>
        </div>
      </div>
      {isfollow ? (
        <Button
          styleType='secondary'
          disabled={false}
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
  );
}
