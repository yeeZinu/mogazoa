"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GOOGLE_ICON, KAKAO_ICON } from "@/utils/constant";
import OauthSignInButton from "./OauthSignInButton/OauthSignInButton";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, []);

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

  return (
    <div>
      Sign In
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: "이메일을 입력해주세요." })} />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password", { required: "비밀번호를 입력해주세요." })} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type='submit'>submit</button>
      </form>
      <OauthSignInButton
        image={GOOGLE_ICON}
        name='google'
        onClick={() => signIn("google")}
      />
      <OauthSignInButton
        image={KAKAO_ICON}
        name='kakao'
        onClick={() => signIn("kakao")}
      />
    </div>
  );
}
