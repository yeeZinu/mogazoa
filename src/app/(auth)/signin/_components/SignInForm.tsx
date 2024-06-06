"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import styles from "./SignInForm.module.scss";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const methods = useForm<SignInFormData>({ mode: "onBlur" });
  const {
    handleSubmit,
    formState: { isValid },
    setError,
  } = methods;
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      console.log("로그인 실패");
      setError("email", { type: "loginError", message: "이메일 혹은 비밀번호를 확인해주세요." });
      setError("password", { type: "loginError" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputBox}>
          <Input
            name='email'
            label='이메일'
            type='email'
            required='이메일은 필수 입력입니다.'
            placeholder='이메일을 입력해 주세요'
            pattern={{ value: emailRegex, message: "이메일 형식으로 작성해주세요." }}
          />
          <Input
            name='password'
            label='비밀번호'
            type='password'
            placeholder='비밀번호를 입력해 주세요'
            required='비밀번호는 필수 입력입니다.'
          />
        </div>
        <Button
          styleType='primary'
          disabled={!isValid}
          className={styles.signInButton}
        >
          로그인
        </Button>
      </form>
    </FormProvider>
  );
}
