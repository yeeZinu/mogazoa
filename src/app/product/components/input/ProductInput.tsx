import Image from "next/image";
import cn from "@/utils/classNames";
import { CHANGE_ICON } from "@/utils/constant";
import styles from "./ProductInput.module.scss";

type CompareInputProps = {
  product: string | undefined;
  isChange: boolean;
  id: string;
  second?: boolean;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
};
export default function ProductInput({ product, isChange, id, second, onClick }: CompareInputProps) {
  return (
    <div className={styles.container}>
      <span className={cn(second ? styles.second : styles.first, product || styles.textGray)}>
        {product || "비교 상품을 등록해주세요."}

        {isChange && (
          <Image
            className={styles.image}
            id={id}
            src={CHANGE_ICON}
            alt='remove'
            width={25}
            height={25}
            onClick={onClick}
          />
        )}
      </span>
    </div>
  );
}
