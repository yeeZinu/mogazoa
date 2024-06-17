/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SIGNIN_VALIDATION } from "@/app/(auth)/constants";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/Input/PasswordInput";
import styles from "./SignInForm.module.scss";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    handleSubmit,
  } = useForm<SignInFormData>({ mode: "onBlur" });
  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setError("email", { type: "loginError", message: "이메일 혹은 비밀번호를 확인해주세요." });
      setError("password", { type: "loginError" });
    }
  };

  return (
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
            rules={SIGNIN_VALIDATION.EMAIL}
            errors={errors}
            placeholder='이메일을 입력해 주세요'
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
            rules={SIGNIN_VALIDATION.PASSWORD}
            errors={errors}
            placeholder='비밀번호를 입력해 주세요'
          />
        </div>
      </div>
      <Button
        styleType='primary'
        disabled={!isValid}
        className={styles.signInButton}
      >
        로그인
      </Button>
    </form>
  );
}
