"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Rating from "@/app/product/components/Rating";
import WithModal from "@/app/product/components/with-modal/WithModal";
import { reviewSubmit } from "@/app/product/utils/apis";
import { FormValues } from "@/app/product/utils/types";
import Button from "@/components/Button/Button";
import CategoryChip from "@/components/Chip/Category-chip/CategoryChip";
import TextArea from "@/components/Input/TextArea";
import MultipleUploader from "@/components/Upload/mulitpleUpload/MultipleUploader";
import PreviewImage from "@/components/Upload/PreviewImage/PreviewImage";
import { ProductDetailType } from "@/types/global";
import LoginModal from "./LoginModal";
import styles from "./ReviewModal.module.scss";

export default function ReviewModal({ productDetail }: { productDetail: ProductDetailType }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const { id, name, category } = productDetail;

  // TODO: Erros처리 추가
  const { register, handleSubmit, setValue, control, watch } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      productId: id,
      images: [],
      content: "",
      rating: 1,
    },
  });

  const { remove } = useFieldArray({ control, name: "uploadImageList" });
  const previewImageList = watch("uploadImageList");
  const hasPreviewImageList = previewImageList?.length !== 0;

  const handleRemoveImage = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    reviewSubmit(data, accessToken);
    window.location.reload();
  };

  if (!accessToken) {
    return (
      <WithModal onClose={() => {}}>
        <LoginModal />
      </WithModal>
    );
  }

  return (
    <form
      className={styles.layout}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CategoryChip>{category.name}</CategoryChip>
      <h2>{name}</h2>
      <Rating
        name='rating'
        setValue={setValue}
      />
      <TextArea
        name='content'
        register={register}
        placeholder='리뷰를 작성해주세요.'
        maxLength={500}
        rows={8}
      />
      <MultipleUploader
        name='uploadImageList'
        className={styles.uploader}
        control={control}
        register={register}
      />
      <section className={styles.imageList}>
        {hasPreviewImageList &&
          previewImageList?.map((image, index) => (
            <PreviewImage
              key={image.source}
              src={image.source}
              alt='review'
              width={150}
              height={150}
              onRemove={() => handleRemoveImage(index)}
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
