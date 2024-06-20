import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, Control, useFieldArray, ArrayPath } from "react-hook-form";
import CropperModal from "@/components/Upload/Cropper/CropperModal";
import cn from "@/utils/classNames";
import { PHOTO_ICON } from "@/utils/constant";
import styles from "./multipleUplader.module.scss";

type UploadImageProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  className?: string;
  control: Control<T>;
};

export default function MultipleUploader<T extends FieldValues>({
  name,
  className = styles.default,
  control,
}: UploadImageProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { append } = useFieldArray({ control, name });

  const handleUploadButtonClick = () => {
    if (fileInputRef?.current) fileInputRef.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setShowModal(true);
    }
  };

  const onCrop = async (croppedImage: Blob) => {
    const imageUrl = URL.createObjectURL(croppedImage);
    setImage(imageUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    append({ blob: croppedImage, source: imageUrl } as any);
    setShowModal(false);
  };

  return (
    <>
      <div className={cn(styles.layout, className)}>
        <button
          className={cn(styles.uploadButton, styles.noneImage)}
          type='button'
          onClick={handleUploadButtonClick}
        >
          <input
            className={styles.uploadInput}
            type='file'
            accept='image/*'
            ref={(event) => {
              fileInputRef.current = event;
            }}
            onChange={handleImageChange}
          />
          <Image
            className={styles.uploadImage}
            src={PHOTO_ICON}
            width={81}
            height={81}
            alt='upload'
          />
          <p className={styles.uploadText}>이미지 선택하기</p>
        </button>
        {showModal && (
          <CropperModal
            image={image}
            onCrop={onCrop}
          />
        )}
      </div>
    </>
  );
}
