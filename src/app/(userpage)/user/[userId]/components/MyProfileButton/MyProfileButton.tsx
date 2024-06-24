import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateProfile } from "@/app/(userpage)/user/[userId]/hooks/useUpdateProfile";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import TextArea from "@/components/Input/TextArea";
import Modal from "@/components/Modal/Modal";
import useUploadImageMutation from "@/components/Upload/hooks/useUploadImageMutation";
import ImageUpload from "@/components/Upload/ImageUpload/ImageUpload";
import { ErrorResponse } from "@/types/global";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./MyProfileButton.module.scss";

type MyProfileButtonProps = {
  Iimage: string;
  Inickname: string;
  Idescription: string;
};

type UserFormValue = {
  description: string;
  nickname: string;
  image: File;
  croppedImage: Blob;
};

export default function MyProfileButton({ Iimage, Inickname, Idescription }: MyProfileButtonProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const accessToken = session?.accessToken ?? "";

  const [isModal, setIsModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClose = () => setIsModal(false);
  const handleOpen = () => setIsModal(true);

  const {
    control,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserFormValue>({ mode: "onBlur" });

  const { updateProfileMutation } = useUpdateProfile(accessToken);
  const uploadImageMutation = useUploadImageMutation();

  const onSubmit: SubmitHandler<UserFormValue> = async (data) => {
    if (data.image) {
      const url = await uploadImageMutation.mutateAsync(data.croppedImage);

      if (url) {
        const profileData = {
          description: data.description,
          nickname: data.nickname,
          image: url,
        };

        await updateProfileMutation.mutateAsync(profileData, {
          onSuccess: () => {
            setIsSubmitted(true);
            queryClient.invalidateQueries({ queryKey: ["userData", String(session?.user.id)] });
            setTimeout(() => {
              handleClose();
              setIsSubmitted(false);
            }, 1000);
          },
          onError: (error: Error) => {
            const response: ErrorResponse = JSON.parse(error.message);
            const errorMessage = response.details?.name?.message;
            if (errorMessage) {
              setError("nickname", { message: `${errorMessage}` });
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
    if (updateProfileMutation.isPending) {
      return "Loading...";
    }
    if (isSubmitted) {
      return "완료!";
    }
    if (isError) {
      return "실패: 다시 시도해 주세요.";
    }
    return "저장하기";
  };

  return (
    <div className={cn(styles.container)}>
      {isModal && (
        <Modal onClose={handleClose}>
          <div className={styles.content}>
            <h2 className={styles.title}>프로필 편집</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <ImageUpload
                name='image'
                defaultImage={Iimage}
                cropFiledName='croppedImage'
                setValue={setValue}
                register={register}
                className={cn(styles.imageUploader)}
              />
              <Input
                name='nickname'
                register={register}
                rules={{
                  required: "닉네임은 필수 입력입니다.",
                  maxLength: { value: 10, message: "닉네임은 최대 10자까지 가능합니다." },
                }}
                errors={errors}
                type='text'
                defaultValue={Inickname}
                maxLength={10}
                className={cn(styles.profileInput)}
              />
              <TextArea
                name='description'
                rows={5}
                control={control}
                defaultValue={Idescription}
                rules={{
                  required: "자기 소개글은 필수 입력입니다.",
                  minLength: { value: 1, message: "최소 1자 이상 적어주세요." },
                  maxLength: 300,
                }}
                errors={errors}
                maxLength={300}
                className={styles.textarea}
              />

              <Button
                type='submit'
                styleType='primary'
                disabled={!isValid || updateProfileMutation.isPending || isSubmitted || isError}
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
              onClick={handleClose}
            />
          </div>
        </Modal>
      )}
      <Button
        styleType='primary'
        onClick={handleOpen}
        className={styles.profile}
      >
        프로필 수정
      </Button>
      <Button
        styleType='tertiary'
        className={styles.profile}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        로그아웃
      </Button>
    </div>
  );
}
