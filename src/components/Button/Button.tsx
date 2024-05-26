"use client";

import cn from "@/utils/classNames";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  styleType: "primary" | "secondary" | "tertiary";
  disabled: boolean;
};

export default function Button({ children, styleType, disabled = false, ...rest }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(
        styles.container,
        styleType === "primary" && styles.primary,
        styleType === "secondary" && styles.secondary,
        styleType === "tertiary" && styles.tertiary,

        disabled === true && styles.disabled,
      )}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
