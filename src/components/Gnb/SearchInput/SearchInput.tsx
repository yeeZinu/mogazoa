"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import cn from "@/utils/classNames";
import { SEARCH_ICON } from "@/utils/constant";
import { createQueryString } from "@/utils/createQueryString";
import styles from "./SearchInput.module.scss";

type SearchInputProps = {
  isOpen: boolean;
  onClick: () => void;
};

type KeywordType = {
  keyword: string;
};

export default function SearchInput({ isOpen, onClick }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<KeywordType>();

  const onSubmit: SubmitHandler<KeywordType> = ({ keyword }) => {
    router.push(`/?${createQueryString("keyword", keyword, searchParams)}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <Image
        className={styles.icon}
        src={SEARCH_ICON}
        width={24}
        height={24}
        alt='돋보기'
        onClick={onClick}
      />

      <input
        className={cn(styles.input, !isOpen && styles.closed)}
        placeholder='상품 이름을 검색해 보세요'
        {...register("keyword", { required: true })}
      />
    </form>
  );
}
