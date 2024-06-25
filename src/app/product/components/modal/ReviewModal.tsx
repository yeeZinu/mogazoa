import debounce from "lodash.debounce";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Rating from "@/app/product/components/rating/Rating";
import WithModal from "@/app/product/components/with-modal/WithModal";
import { reviewSubmit } from "@/app/product/utils/apis";
import { FormValues, ModalProps } from "@/app/product/utils/types";
import Button from "@/components/Button/Button";
import CategoryChip from "@/components/Chip/Category-chip/CategoryChip";
import TextArea from "@/components/Input/TextArea";
import MultipleUpload from "@/components/Upload/ImageUpload/MultipleUpload";
import PreviewImage from "@/components/Upload/PreviewImage/RemovePreviewImage";
import LoginModal from "./LoginModal";
import styles from "./ReviewModal.module.scss";

export default function ReviewModal({ productDetail, session, onClose }: ModalProps) {
  const accessToken = session?.accessToken;
  const { id, name, category } = productDetail;

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<FormValues>({
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
  };

  if (!accessToken) {
    return (
      <WithModal onClose={onClose}>
        <LoginModal />
      </WithModal>
    );
  }

  const debouncedOnSubmit = debounce(handleSubmit(onSubmit), 1000);

  return (
    <form
      className={styles.layout}
      onSubmit={debouncedOnSubmit}
    >
      <CategoryChip>{category.name}</CategoryChip>
      <h2>{name}</h2>
      <Rating
        name='rating'
        setValue={setValue}
      />
      <TextArea
        name='content'
        control={control}
        placeholder='리뷰를 작성해주세요.'
        rules={{ required: "리뷰를 입력해주세요", minLength: { value: 10, message: "10글자 이상 입력해주세요." } }}
        errors={errors}
        maxLength={300}
        rows={8}
      />
      <MultipleUpload
        name='uploadImageList'
        className={styles.uploader}
        control={control}
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
        disabled={!isValid}
      >
        등록하기
      </Button>
    </form>
  );
}
