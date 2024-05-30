"use client";

import cn from "@/utils/classNames";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  styleType: "primary" | "secondary" | "tertiary";
  disabled: boolean;
  className: string;
};

export default function Button({ children, styleType, disabled = false, className, ...rest }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(styles.container, styles[styleType], `${className}`)}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
