"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import createQueryString from "@/utils/createQueryString";
import styles from "./Category.module.scss";
import { mock } from "./mock";

type CategoryProps = {
  isOpen: boolean;
  selected: null | string;
  onToggle: () => void;
  onSelect: (category: null | string) => void;
};

export default function Category({ isOpen, selected, onToggle, onSelect }: CategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryList = mock;

  const handleClick = (id: number, name: string) => {
    if (selected === name) {
      onSelect(null);
    } else {
      onSelect(name);
    }

    onToggle();

    router.push(`/?${createQueryString("category", id.toString(), searchParams)}`);
  };

  return (
    <div className={cn(styles.container, isOpen && styles.open)}>
      <Image
        className={cn(styles.closeButton)}
        src={CLOSE_ICON}
        width={18}
        height={18}
        alt='close'
        onClick={onToggle}
      />
      <div className={cn(styles.category)}>카테고리</div>
      <ul
        role='menu'
        className={cn(styles.list)}
      >
        {categoryList.map(({ id, name }) => (
          <li key={id}>
            <div
              role='button'
              className={cn(styles.item, selected === name && styles.selected)}
              onClick={() => handleClick(id, name)}
              onKeyDown={() => handleClick(id, name)}
              tabIndex={0}
            >
              {name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
