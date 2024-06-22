import Image, { ImageProps } from "next/image";
import cn from "@/utils/classNames";
import { DELETE_ICON, REFRESH_ICON } from "@/utils/constant";
import styles from "./PreviewImage.module.scss";

type PreviewImageProps = { className?: string; isDelete?: boolean; onRemove: () => void } & ImageProps;
export default function PreviewImage({ isDelete = false, onRemove, ...rest }: PreviewImageProps) {
  return (
    <div className={styles.container}>
      <Image
        className={cn(styles.image)}
        {...rest}
      />
      <Image
        src={isDelete ? REFRESH_ICON : DELETE_ICON}
        className={styles.close}
        onClick={onRemove}
        alt={isDelete ? "rewind" : "delete"}
        width={40}
        height={40}
      />
    </div>
  );
}
