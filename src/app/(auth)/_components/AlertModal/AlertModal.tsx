"use client";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import styles from "./AlertModal.module.scss";

type AlertModalProps = {
  children: React.ReactNode;
  handleClose: () => void;
  isModal: boolean;
};

export default function AlertModal({ children, handleClose, isModal }: AlertModalProps) {
  return (
    <>
      {isModal && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>Sign up Error 😣</h2>
            <p className={styles.message}>{children}</p>
            <Button
              className={styles.button}
              styleType='primary'
              onClick={handleClose}
            >
              닫기
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
