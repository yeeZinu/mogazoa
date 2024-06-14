/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertModal } from "@/app/(auth)/_components/AlertModal";
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
    formState: { isValid, errors },
  } = useForm<SignUpFormData>({ mode: "onBlur" });
  const router = useRouter();

  const handleModalClose = () => {
    setIsModal(false);
  };

  /**
   * @TODO signin 페이지 머지 후 상수 파일에 분리
   */
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PASSWORD_REGEX = /^[a-z0-9!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?`~]{8,}$/i;
  const SIGNUP_VALIDATION = {
    email: {
      required: { value: true, message: "이메일은 필수 입력입니다." },
      pattern: {
        value: EMAIL_REGEX,
        message: "이메일 형식으로 작성해주세요.",
      },
    },
    nickname: {
      required: { value: true, message: "닉네임은 필수 입력입니다." },
      maxLength: { value: 20, message: "닉네임은 최대 20자까지 가능합니다." },
    },
    password: {
      required: { value: true, message: "비밀번호는 필수 입력입니다." },
      minLength: { value: 8, message: "비밀번호는 최소 8자 이상입니다." },
      pattern: { value: PASSWORD_REGEX, message: "비밀번호는 숫자, 영문, 특수문자로만 이루어져야 합니다." },
    },
    passwordConfirmation: {
      required: { value: true, message: "비밀번호 확인을 입력해주세요." },
      validate: (value: string) => {
        if (watch("password") !== value) {
          return "비밀번호가 일치하지 않습니다.";
        }
        return true;
      },
    },
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signIn("signup", {
        redirect: false,
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      if (result?.error) {
        setModalMessage(result?.error);
        setIsModal(true);
      } else {
        router.push("/");
      }
    } catch (error) {
      /**
       * @TODO : 일반적인 HTTP 통신 오류 에러 핸들링
       */
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
          <div className={styles.inputBox}>
            <label
              htmlFor='email'
              className={styles.label}
            >
              이메일
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              register={register}
              rules={SIGNUP_VALIDATION.email}
              errors={errors}
              placeholder='이메일을 입력해 주세요'
            />
          </div>
          <div className={styles.inputBox}>
            <label
              htmlFor='nickname'
              className={styles.label}
            >
              닉네임
            </label>
            <Input
              id='nickname'
              name='nickname'
              type='text'
              register={register}
              rules={SIGNUP_VALIDATION.nickname}
              errors={errors}
              placeholder='닉네임을 입력해주세요'
            />
          </div>
          <div className={styles.inputBox}>
            <label
              htmlFor='password'
              className={styles.label}
            >
              비밀번호
            </label>
            <PasswordInput
              id='password'
              name='password'
              register={register}
              rules={SIGNUP_VALIDATION.password}
              errors={errors}
              placeholder='비밀번호를 입력해 주세요'
            />
          </div>
          <div className={styles.inputBox}>
            <label
              htmlFor='passwordConfirmation'
              className={styles.label}
            >
              비밀번호 확인
            </label>
            <PasswordInput
              id='passwordConfirmation'
              name='passwordConfirmation'
              register={register}
              rules={SIGNUP_VALIDATION.passwordConfirmation}
              errors={errors}
              placeholder='비밀번호를 한번 더 입력해 주세요'
            />
          </div>
        </div>
        <Button
          styleType='primary'
          disabled={!isValid}
          className={styles.signInButton}
        >
          가입하기
        </Button>
      </form>
    </>
  );
}
