/* eslint-disable jsx-a11y/label-has-associated-control */

import { LabelHTMLAttributes } from "react";
import styles from "./LabelBox.module.scss";

type LabelBoxProps = {
  children: React.ReactNode;
  title: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export default function LabelBox({ children, title, ...rest }: LabelBoxProps) {
  return (
    <label
      className={styles.container}
      {...rest}
    >
      <span className={styles.title}>{title}</span>
      {children}
    </label>
  );
}
