"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import cn from "@/utils/classNames";
import { LOGO_IMAGE, MENU_TOGGLE_ICON, CLOSE_ICON } from "@/utils/constant";
import styles from "./Gnb.module.scss";
import { SearchInput } from "./SearchInput";

export default function Gnb() {
  const [isInputOpen, setInputOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { status } = useSession();

  const handleSearchClick = () => {
    setInputOpen(!isInputOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.menuIcon}
        src={MENU_TOGGLE_ICON}
        width={24}
        height={24}
        alt='메뉴'
        onClick={handleMenuClick}
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
          onClick={handleSearchClick}
        />

        <div className={cn(styles.sidebar, isMenuOpen && styles.open)}>
          <Image
            className={cn(styles.closeIcon)}
            src={CLOSE_ICON}
            width={18}
            height={18}
            alt='닫기'
            onClick={handleMenuClick}
          />
          <div className={cn(styles.userAction, isMenuOpen && styles.open)}>
            {status === "authenticated" ? (
              <>
                <Link href='/compare'>비교하기</Link>
                <Link href='/mypage'>내 프로필</Link>
              </>
            ) : (
              <>
                <Link href='/signin'>로그인</Link>
                <Link href='/signup'>회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
