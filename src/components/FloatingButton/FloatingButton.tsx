"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";
import { AddModal } from "@/components/AddModal";
import { useSessionCheck } from "@/hooks/useSessionCheck";
import cn from "@/utils/classNames";
import { ADD_ICON } from "@/utils/constant";
import styles from "./FloatingButton.module.scss";

type FloatingButtonProps = {
  initialSession: Session | null;
};

export default function FloatingButton({ initialSession }: FloatingButtonProps) {
  const [isModal, setIsModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(initialSession);

  const handleOpen = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const handleSession = (session: Session | null) => {
    setCurrentSession(session);
  };

  useSessionCheck(initialSession, handleSession);

  if (!currentSession) {
    return null;
  }

  return (
    <>
      <button
        type='button'
        className={cn(styles.button)}
        onClick={handleOpen}
      >
        <Image
          src={ADD_ICON}
          width={40}
          height={40}
          alt='상품 추가하기'
        />
      </button>
      {isModal && <AddModal onClose={handleClose} />}
    </>
  );
}
