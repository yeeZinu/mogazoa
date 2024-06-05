import React from "react";
import cn from "@/utils/classNames";
import styles from "./TabButton.module.scss";

type TabButtonProps = {
  button: string;
  onSelectButton: (value: string) => void;
};

export default function TabButton({ button, onSelectButton }: TabButtonProps) {
  return (
    <div>
      <div className={cn(styles.buttonBox)}>
        <div
          className={cn(styles.selectButton, styles[`${button === "reviewed" ? "active" : ""}`])}
          onClick={() => onSelectButton("reviewed")}
          onKeyDown={() => onSelectButton("reviewed")}
          role='button'
          tabIndex={0}
        >
          리뷰 남긴 상품
        </div>
        <div
          className={cn(styles.selectButton, styles[`${button === "created" ? "active" : ""}`])}
          onClick={() => {
            onSelectButton("created");
          }}
          onKeyDown={() => onSelectButton("created")}
          role='button'
          tabIndex={0}
        >
          등록한 상품
        </div>
        <div
          className={cn(styles.selectButton, styles[`${button === "favorite" ? "active" : ""}`])}
          onClick={() => {
            onSelectButton("favorite");
          }}
          onKeyDown={() => onSelectButton("favorite")}
          role='button'
          tabIndex={0}
        >
          찜한 상품
        </div>
      </div>
    </div>
  );
}
