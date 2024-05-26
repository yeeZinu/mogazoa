"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchInput from "@/components/Gnb/SearchInput";
import cn from "@/utils/classNames";
import { LOGO_IMAGE, MENU_TOGGLE_ICON } from "@/utils/constant";
import styles from "./Gnb.module.scss";

export default function Gnb() {
  const [isInputOpen, setInputOpen] = useState(true);

  const handleClick = () => {
    setInputOpen(!isInputOpen);
  };

  // TODO: 로그인 상태 가져오기
  const isLogin = true;

  return (
    <div className={styles.container}>
      <Image
        className={styles.menuIcon}
        src={MENU_TOGGLE_ICON}
        width={24}
        height={24}
        alt='메뉴'
      />

      <div className={styles.logoBox}>
        <Link href='/'>
          <Image
            className={cn(styles.logo, isInputOpen && styles.invisible)}
            src={LOGO_IMAGE}
            width={166}
            height={28}
            alt='로고'
          />
        </Link>
      </div>

      <div className={styles.actionBox}>
        <SearchInput
          isOpen={isInputOpen}
          onClick={handleClick}
        />

        {isLogin ? (
          <div className={styles.userAction}>
            <Link href='/compare'>비교하기</Link>
            <Link href='/mypage'>내 프로필</Link>
          </div>
        ) : (
          <div className={styles.userAction}>
            <Link href='/signin'>로그인</Link>
            <Link href='/signup'>회원가입</Link>
          </div>
        )}
      </div>
    </div>
  );
}
