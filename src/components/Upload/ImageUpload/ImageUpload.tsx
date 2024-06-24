import Image from "next/image";
import { useState } from "react";
import { UseFormRegister, UseFormSetValue, FieldValues, Path, RegisterOptions, PathValue } from "react-hook-form";
import CropperModal from "@/components/Upload/Cropper/CropperModal";
import readFile from "@/components/Upload/utils/readFile";
import cn from "@/utils/classNames";
import { PHOTO_ICON } from "@/utils/constant";
import styles from "./ImageUpload.module.scss";

type UploadImageProps<T extends FieldValues> = {
  name: Path<T>;
  cropFiledName: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
  defaultImage?: string | null;
  rules?: RegisterOptions;
  setValue: UseFormSetValue<T>;
};

export default function UploadImage<T extends FieldValues>({
  name,
  cropFiledName,
  register,
  className = styles.default,
  defaultImage = null,
  rules,
  setValue,
}: UploadImageProps<T>) {
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState<string | null>(defaultImage);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = await readFile(file);
      setImage(imageUrl);
      setShowCropper(true);
    }
  };

  const onCrop = async (croppedImage: Blob | null) => {
    if (croppedImage) {
      setImage(URL.createObjectURL(croppedImage));
      setValue(cropFiledName, croppedImage as PathValue<T, Path<T>>);
      setShowCropper(false);
    }
  };

  return (
    <>
      <div className={cn(styles.layout, className)}>
        {image && (
          <Image
            className={styles.productImage}
            src={image}
            width={300}
            height={300}
            alt='product'
          />
        )}

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
          {...register(name, { ...rules, onChange: handleImageChange })}
        />
        {showCropper && (
          <CropperModal
            image={image}
            onCrop={onCrop}
          />
        )}
      </div>
    </>
  );
}
