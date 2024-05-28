"use client";

import { useState } from "react";
import cn from "@/utils/classNames";
import styles from "./Category.module.scss";
import { mock } from "./mock";

export default function Category() {
  const categoryList = mock;

  const [selected, setSelected] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (item: number) => {
    if (selected === item) {
      setSelected(null);
    } else {
      setSelected(item);
    }

    // query string
  };

  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type='button'
        className={cn(styles.mobileButton)}
        onClick={toggleCategory}
      >
        {selected ?? "카테고리"}
      </button>
      <div className={cn(styles.container, isOpen && styles.open)}>
        <button
          type='button'
          className={cn(styles.closeButton)}
          onClick={toggleCategory}
        >
          닫기
        </button>
        <div className={cn(styles.category)}>카테고리</div>
        <ul
          role='menu'
          className={cn(styles.list)}
        >
          {categoryList.map(({ id, name }) => (
            <li key={id}>
              <div
                role='button'
                className={cn(styles.item, selected === id && styles.selected)}
                onClick={() => handleClick(id)}
                onKeyDown={() => handleClick(id)}
                tabIndex={0}
              >
                {name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
