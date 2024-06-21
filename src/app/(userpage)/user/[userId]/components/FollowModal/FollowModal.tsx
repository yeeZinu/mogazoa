import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { UserProduct } from "@/app/(userpage)/types";
import Modal from "@/components/Modal/Modal";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import HttpClient from "@/utils/httpClient";
import styles from "./FollowModal.module.scss";
// eslint-disable-next-line no-restricted-imports
import FollowList from "../FollowList/FollowList";

type ModalProps = {
  followState: string;
  isModalState: boolean;
  setIsModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FollowModal({ isModalState, setIsModalState, followState }: ModalProps) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const ACCESS_TOKEN = session?.accessToken ?? "";

  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL!);

  const { data } = useQuery({
    queryKey: ["followData", followState],
    queryFn: async () => {
      const res = httpClient.get<UserProduct>(`/users/${userId}/${followState}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        cache: "no-cache",
      });
      return res;
    },
  });

  const handleClose = () => setIsModalState(false);
  return (
    <>
      {data !== undefined && isModalState && (
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
            <h1>nickname님{followState === "followees" ? "이" : "을"} 팔로우 하는 유저</h1>
            {data.list.length < 1 ? (
              <div className={cn(styles.noFollowBox)}>팔로우하는 유저가 없어요</div>
            ) : (
              <FollowList followData={data} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
