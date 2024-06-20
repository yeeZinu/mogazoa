import Image, { ImageProps } from "next/image";
import styles from "./PreviewImage.module.scss";

type PreviewImageProps = { onRemove: () => void } & ImageProps;
export default function PreviewImage({ onRemove, ...rest }: PreviewImageProps) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        {...rest}
      />
      <button
        className={styles.close}
        type='button'
        onClick={onRemove}
      >
        삭제하기
      </button>
    </div>
  );
}
