import React, { useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import cn from "@/utils/classNames";
import styles from "./MyProfileButton.module.scss";

export default function MyProfileButton() {
  const [isModal, setIsModal] = useState(false);
  const handleClose = () => setIsModal(false);
  const handleOpen = () => setIsModal(true);

  return (
    <div className={cn(styles.container)}>
      {isModal && (
        <Modal onClose={handleClose}>
          <div className={styles.profileEdit}>모달 테스트</div>
        </Modal>
      )}
      <Button
        styleType='primary'
        onClick={handleOpen}
        className={styles.profile}
      >
        프로필 수정
      </Button>
      <Button
        styleType='tertiary'
        className={styles.profile}
      >
        로그아웃
      </Button>
    </div>
  );
}
