import Image from "next/image";
import cn from "@/utils/classNames";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constant";
import styles from "./NoData.module.scss";

type NoDataProps = {
  message: string;
};

export default function NoData({ message }: NoDataProps) {
  return (
    <div className={cn(styles.container)}>
      <Image
        src={DEFAULT_PRODUCT_IMAGE}
        width={200}
        height={100}
        alt='로고'
      />
      <div className={cn(styles.message)}>{message}</div>
    </div>
  );
}
