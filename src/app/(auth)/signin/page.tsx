"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { GOOGLE_ICON, KAKAO_ICON } from "@/utils/constant";
import OauthSignInButton from "./_components/OauthSignInButton/OauthSignInButton";
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

  const handleKakaoSignIn = async () => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    // 인가 코드 요청
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      scope: "openid",
    });
  };

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
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

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code") ?? "";

      if (!localStorage.getItem("authCode") && code) {
        // 다시 redirect됐을 경우 요청 두 번 방지
        localStorage.setItem("authCode", code);
        const result = await signIn("kakao", { redirect: false, callbackUrl: "/", code });

        if (result?.status === 403) {
          localStorage.removeItem("authCode");
          router.push("/oauth/signup/kakao");
        }
      }
    };
    handleKakaoCallback();
  }, [router]);

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
      <OauthSignInButton
        image={GOOGLE_ICON}
        name='google'
        onClick={() => signIn("google", { callbackUrl: "/" })}
      />
      <OauthSignInButton
        image={KAKAO_ICON}
        name='kakao'
        onClick={handleKakaoSignIn}
      />
    </div>
  );
}
