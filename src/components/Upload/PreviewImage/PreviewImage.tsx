import Image from "next/image";
import styles from "./PreviewImage.module.scss";

type ImagePreviewProps = {
  image: string | null;
};

const ImagePreview = ({ image }: ImagePreviewProps) => (
  <>
    {image && (
      <Image
        className={styles.productImage}
        src={image}
        width={300}
        height={300}
        alt='product'
      />
    )}
  </>
);

export default ImagePreview;
