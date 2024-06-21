/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const loginUser = session?.user.id;
  const ACCESS_TOKEN = session?.accessToken;

  const handelFolloweesModal = () => {
    setFollowModalProps("followees");
    setIsModalOpen(true);
  };

  const handelFollowersModal = () => {
    setFollowModalProps("followers");
    setIsModalOpen(true);
  };

  const followPostDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/follow`, {
      method: isfollow ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ userId: Number(userId) }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await res.json();
    return data;
  };

  const mutation = useMutation({
    mutationKey: ["followData", userId],
    mutationFn: followPostDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData", String(userId)] });
    },
    onError: (error: Error) => {
      console.error("Mutation failed", error.message);
    },
  });

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
                disabled={false}
                className={styles.profile}
                onClick={() => mutation.mutate()}
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                styleType='primary'
                disabled={false}
                className={styles.profile}
                onClick={() => mutation.mutate()}
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
