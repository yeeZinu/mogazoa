"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "@/app/(auth)/_components/AlertModal";
import { LabelBox } from "@/app/(auth)/_components/LabelBox";
import { SIGNUP_VALIDATION } from "@/app/(auth)/constants";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import styles from "./SignUpForm.module.scss";

type SignUpFormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUpForm() {
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<SignUpFormData>({ mode: "onBlur" });
  const router = useRouter();

  const handleModalClose = () => {
    setIsModal(false);
  };

  const PASSWORD_CONFIRMATION_VALIDATION = {
    ...SIGNUP_VALIDATION.passwordConfirmation,
    validate: (value: string) => {
      if (watch("password") !== value) {
        return "비밀번호가 일치하지 않습니다.";
      }
      return true;
    },
  };

  const onSubmit = async (data: SignUpFormData) => {
    const result = await signIn("signup", {
      redirect: false,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    if (result?.error) {
      setModalMessage(result.error);
      setIsModal(true);

      if (result.error.includes("닉네임")) {
        setError("nickname", { message: result.error });
      } else if (result.error.includes("이메일")) {
        setError("email", { message: result.error });
      }
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <AlertModal
        isModal={isModal}
        handleClose={handleModalClose}
      >
        {modalMessage}
      </AlertModal>
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputList}>
          <LabelBox
            htmlFor='email'
            title='이메일'
          >
            <Input
              id='email'
              name='email'
              type='email'
              register={register}
              rules={SIGNUP_VALIDATION.email}
              errors={errors}
              placeholder='이메일을 입력해 주세요'
            />
          </LabelBox>
          <LabelBox
            htmlFor='nickname'
            title='닉네임'
          >
            <Input
              id='nickname'
              name='nickname'
              type='text'
              register={register}
              rules={SIGNUP_VALIDATION.nickname}
              errors={errors}
              placeholder='닉네임을 입력해주세요'
            />
          </LabelBox>
          <LabelBox
            htmlFor='password'
            title='비밀번호'
          >
            <PasswordInput
              id='password'
              name='password'
              register={register}
              rules={SIGNUP_VALIDATION.password}
              errors={errors}
              placeholder='비밀번호를 입력해 주세요'
            />
          </LabelBox>
          <LabelBox
            htmlFor='passwordConfirmation'
            title='비밀번호 확인'
          >
            <PasswordInput
              id='passwordConfirmation'
              name='passwordConfirmation'
              register={register}
              rules={PASSWORD_CONFIRMATION_VALIDATION}
              errors={errors}
              placeholder='비밀번호를 한번 더 입력해 주세요'
            />
          </LabelBox>
        </div>
        <Button
          styleType='primary'
          disabled={!isValid || isSubmitting}
          className={styles.signUpButton}
        >
          {isSubmitting ? "가입중..." : "가입하기"}
        </Button>
      </form>
    </>
  );
}
