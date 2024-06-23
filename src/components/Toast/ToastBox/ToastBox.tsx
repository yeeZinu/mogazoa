import Image from "next/image";
import { useEffect, useState } from "react";
import { Message, ToastType } from "@/components/Toast/type";
import cn from "@/utils/classNames";
import { CAUTION_ICON, CLOSE_ICON, ERROR_ICON, INFO_ICON, SUCCESS_ICON } from "@/utils/constant";
import styles from "./ToastBox.module.scss";

type ToastBoxProps = Message & {
  onClose: (id: string) => void;
};

const iconMap: Record<ToastType, string> = {
  success: SUCCESS_ICON,
  caution: CAUTION_ICON,
  error: ERROR_ICON,
  info: INFO_ICON,
};

export default function ToastBox({ message, type, id, onClose }: ToastBoxProps) {
  const [visible, setVisible] = useState(false);
  const imageSrc = iconMap[type];

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={cn(styles.container, styles[type], visible && styles.visible)}>
      <div className={styles.information}>
        <div className={styles.imageBox}>
          <Image
            src={imageSrc}
            alt={type}
            fill
          />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.closeButton}
        type='button'
        onClick={() => onClose(id)}
      >
        <Image
          src={CLOSE_ICON}
          alt='close'
          fill
        />
      </button>
    </div>
  );
}
