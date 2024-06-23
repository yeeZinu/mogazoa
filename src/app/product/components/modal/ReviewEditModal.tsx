"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Rating from "@/app/product/components/rating/Rating";
import { reviewPatch } from "@/app/product/utils/apis";
import { EditFormValues } from "@/app/product/utils/types";
import Button from "@/components/Button/Button";
import TextArea from "@/components/Input/TextArea";
import MultipleUpload from "@/components/Upload/ImageUpload/MultipleUpload";
import PreviewImage from "@/components/Upload/PreviewImage/RemovePreviewImage";
import { ReviewType } from "@/types/global";
import cn from "@/utils/classNames";
import styles from "./ReviewEditModal.module.scss";

export default function ReviewEditModal({ review }: { review: ReviewType }) {
  const { id: reviewId, rating, content, reviewImages } = review;
  const hasReviewImageList = reviewImages?.length !== 0;
  const [removeIndex, setRemoveIndex] = useState<boolean[]>(Array(reviewImages.length).map(() => false));
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<EditFormValues>({
    mode: "onBlur",
    defaultValues: {
      uploadImageList: [],
      content,
      rating,
    },
  });
  const { remove } = useFieldArray({ control, name: "uploadImageList" });

  const previewImageList = watch("uploadImageList");
  const hasPreviewImageList = previewImageList?.length !== 0;

  const handleDefaultImageClick = (index: number) => {
    const newRemoveIndex = [...removeIndex];
    newRemoveIndex[index] = !newRemoveIndex[index];
    setRemoveIndex(newRemoveIndex);
  };

  const handleUploadImageClick = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    const originalImageList: { source: string }[] = [];
    removeIndex.forEach((isRemoveImage, index) => {
      if (!isRemoveImage) originalImageList.push({ source: reviewImages[index].source });
    });
    reviewPatch(data, reviewId, accessToken, originalImageList);
  };

  return (
    <form
      className={styles.layout}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Rating
        name='rating'
        setValue={setValue}
        defaultValue={rating}
      />
      <TextArea
        name='content'
        control={control}
        placeholder='리뷰를 작성해주세요.'
        maxLength={500}
        rows={8}
      />
      <MultipleUpload
        name='uploadImageList'
        className={styles.uploader}
        control={control}
        errors={errors}
      />
      <section className={styles.imageList}>
        {hasReviewImageList &&
          reviewImages?.map((image, index) => (
            <PreviewImage
              className={cn(removeIndex[index] && styles.delete)}
              key={image.id}
              src={image.source}
              isDelete={removeIndex[index]}
              onRemove={() => handleDefaultImageClick(index)}
              alt='review'
              width={150}
              height={150}
            />
          ))}
        {hasPreviewImageList &&
          previewImageList?.map((image, index) => (
            <PreviewImage
              key={image.source}
              src={image.source}
              alt='review'
              width={150}
              height={150}
              onRemove={() => handleUploadImageClick(index)}
            />
          ))}
      </section>
      <Button
        className={styles.button}
        styleType='primary'
        type='submit'
      >
        test
      </Button>
    </form>
  );
}
