"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { OauthSignInBox } from "./_components/OauthSignInBox";
import styles from "./SignInPage.module.scss";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [isDisabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const result = await signIn("signin", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      console.log("로그인 실패");
    }
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [errors.email, errors.password]);

  return (
    <div>
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor='email'>
          email
          <input
            id='email'
            type='email'
            {...register("email", { required: "이메일을 입력해주세요." })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label htmlFor='password'>
          password
          <input
            id='password'
            type='password'
            {...register("password", { required: "비밀번호를 입력해주세요." })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <Button
          styleType='primary'
          disabled={isDisabled}
          className={styles.button}
          type='submit'
        >
          SignIn
        </Button>
      </form>
      <OauthSignInBox />
    </div>
  );
}
