import Image from "next/image";
import { useState } from "react";
import { FieldValues, Control, useFieldArray, ArrayPath, FieldErrors, FieldArray } from "react-hook-form";
import CropperModal from "@/components/Upload/Cropper/CropperModal";
import readFile from "@/components/Upload/utils/readFile";
import cn from "@/utils/classNames";
import { PHOTO_ICON } from "@/utils/constant";
import styles from "./MultipleUpload.module.scss";

type UploadImageProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  className?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
};

export default function MultipleUpload<T extends FieldValues>({
  name,
  className = styles.default,
  control,
  errors,
}: UploadImageProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { append } = useFieldArray({ control, name });

  const error = errors?.[name];
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setImage(await readFile(files[0]));
      setShowModal(true);
    }
  };

  const onCrop = async (croppedImage: Blob | null) => {
    if (croppedImage) {
      const imageUrl = URL.createObjectURL(croppedImage);
      append({ blob: croppedImage, source: imageUrl } as FieldArray<T>);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className={cn(styles.layout, className, error && styles.error)}>
        <label
          className={styles.label}
          htmlFor={name}
        >
          <Image
            className={styles.uploadImage}
            src={PHOTO_ICON}
            width={80}
            height={80}
            alt='upload'
          />
          <p className={styles.uploadText}>이미지 선택하기</p>
        </label>
        <input
          id={name}
          className={styles.uploadInput}
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
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
