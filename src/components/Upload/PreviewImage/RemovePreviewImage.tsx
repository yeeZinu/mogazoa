import Image, { ImageProps } from "next/image";
import cn from "@/utils/classNames";
import { CLOSE_ICON, REFRESH_ICON } from "@/utils/constant";
import styles from "./RemovePreviewImage.module.scss";

type PreviewImageProps = { className?: string; isDelete?: boolean | null; onRemove?: () => void } & ImageProps;
export default function PreviewImage({ isDelete = false, onRemove, ...rest }: PreviewImageProps) {
  return (
    <div className={styles.container}>
      <Image
        className={cn(styles.image)}
        {...rest}
      />

      <Image
        src={isDelete ? REFRESH_ICON : CLOSE_ICON}
        className={styles.close}
        onClick={onRemove}
        alt={isDelete ? "rewind" : "delete"}
        width={25}
        height={25}
      />
    </div>
  );
}
