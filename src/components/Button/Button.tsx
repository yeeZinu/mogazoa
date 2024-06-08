"use client";

import { ButtonHTMLAttributes } from "react";
import cn from "@/utils/classNames";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  styleType: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, styleType, disabled = false, className = "noStyle", ...rest }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(styles.container, styles[styleType], styles[className])}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
