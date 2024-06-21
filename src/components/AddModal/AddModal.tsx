"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button/Button";
import { Dropdown } from "@/components/Dropdown";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Input/TextArea";
import Modal from "@/components/Modal/Modal";
import useUploadImageMutation from "@/components/Upload/hooks/useUploadImageMutation";
import UploadImage from "@/components/Upload/UploadImage";
import { useGetCategory } from "@/hooks/useGetCategory";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./AddModal.module.scss";
import type { ItemType } from "@/components/Dropdown/type";
import type { CategoryType, ErrorResponse } from "@/types/global";

type ProductModalProps = {
  onClose: () => void;
};

type FormValues = {
  productName: string;
  category: number;
  description: string;
  image: File;
};

export default function AddModal({ onClose }: ProductModalProps) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  const { data: categoryList, isPending } = useGetCategory();
  const { updateProductMutation } = useUpdateProduct(accessToken);
  const uploadImageMutation = useUploadImageMutation();

  // TODO: 카테고리 데이터 불러오기 실패 시
  if (isPending) {
    return null;
  }

  const categories: ItemType[] = categoryList?.map((category: CategoryType) => ({
    value: category.id,
    option: category.name,
  }));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.image) {
      const url = await uploadImageMutation.mutateAsync(data.image);

      if (url) {
        const productData = {
          name: data.productName,
          description: data.description,
          categoryId: data.category,
          image: url,
        };

        await updateProductMutation.mutateAsync(productData, {
          onSuccess: () => {
            setIsSubmitted(true);
            setTimeout(() => {
              setIsSubmitted(false);
              onClose();
            }, 2000);
          },
          onError: (error: Error) => {
            const response: ErrorResponse = JSON.parse(error.message);
            const errorMessage = response.details?.name?.message;
            if (errorMessage) {
              setError("productName", { message: `${errorMessage}` });
            } else {
              setIsError(true);
              setTimeout(() => {
                setIsError(false);
              }, 2000);
            }
          },
        });
      }
    }
  };

  const getButtonText = () => {
    if (updateProductMutation.isPending) {
      return "Loading...";
    }
    if (isSubmitted) {
      return "완료!";
    }
    if (isError) {
      return "실패: 다시 시도해 주세요.";
    }
    return "추가하기";
  };

  return (
    <Modal onClose={onClose}>
      <div className={cn(styles.container)}>
        <div className={cn(styles.content)}>
          <h2 className={cn(styles.header)}>상품 추가</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(styles.form)}
          >
            <UploadImage
              name='image'
              setValue={setValue}
              register={register}
              className={cn(styles.imageUploader)}
            />

            <Input
              name='productName'
              register={register}
              rules={{ required: "상품 이름은 필수 입력입니다." }}
              errors={errors}
              type='text'
              placeholder='상품명(상품 등록 여부를 확인해 주세요)'
              maxLength={20}
              className={cn(styles.input)}
            />

            <Dropdown
              items={categories}
              control={control}
              name='category'
              placeholder='카테고리 선택'
              rules={{ required: "카테고리를 선택해주세요." }}
              className={cn(styles.dropdown)}
            />

            <TextArea
              name='description'
              rows={5}
              register={register}
              rules={{
                required: "상품 설명은 필수 입력입니다.",
                minLength: { value: 10, message: "최소 10자 이상 적어주세요." },
                maxLength: 500,
              }}
              errors={errors}
              maxLength={500}
              className={styles.textarea}
            />

            <Button
              type='submit'
              styleType='primary'
              disabled={!isValid || updateProductMutation.isPending || isSubmitted || isError}
              className={cn(styles.submitButton, isError && styles.error)}
            >
              {getButtonText()}
            </Button>
          </form>
          <Image
            className={cn(styles.closeButton)}
            src={CLOSE_ICON}
            width={40}
            height={40}
            alt='닫기'
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
