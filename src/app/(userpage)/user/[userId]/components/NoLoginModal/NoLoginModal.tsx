/* eslint-disable no-nested-ternary */
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./NoLoginModal.module.scss";

type ModalProps = {
  isModalState: boolean;
  setIsModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NoLoginModal({ isModalState, setIsModalState }: ModalProps) {
  const router = useRouter();
  const handleClose = () => setIsModalState(false);

  return (
    <>
      {isModalState && (
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
            <div className={cn(styles.content)}>
              <h1>알림</h1>
              <span>로그인 후 이용하실 수 있습니다.</span>
              <Button
                styleType='primary'
                onClick={() => router.push("/signin")}
              >
                Login 하러 가기
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
