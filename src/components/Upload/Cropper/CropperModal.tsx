import styles from "./CropperModal.module.scss";
import ImageCropper from "./ImageCropper";

type CropperModalProps = {
  image: string | null;
  onCrop: (croppedImage: Blob) => Promise<void>;
};

export default function CropperModal({ image, onCrop }: CropperModalProps) {
  // TODO: 취소하기 기능
  return (
    <div className={styles.container}>
      <ImageCropper
        image={image}
        onCrop={onCrop}
      />
    </div>
  );
}
