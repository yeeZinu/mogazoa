"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LabelBox } from "@/app/(auth)/_components/LabelBox";
import { SIGNUP_VALIDATION } from "@/app/(auth)/constants";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Toast } from "@/components/Toast";
import styles from "./OauthSignUpForm.module.scss";

type OauthSignUpFormProps = {
  provider: string;
  token?: string;
};

type OauthSignUpFormData = {
  nickname: string;
};

export default function OauthSignUpForm({ provider, token }: OauthSignUpFormProps) {
  const [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setError,
  } = useForm<OauthSignUpFormData>({ mode: "onBlur" });

  const onSubmit = async (data: OauthSignUpFormData) => {
    const result = await signIn("easySignup", {
      redirect: false,
      token,
      provider,
      nickname: data.nickname,
    });

    if (result?.error && result?.error.includes("닉네임")) {
      toast?.error(result.error);
      setError("nickname", { message: result.error });
    } else if (result?.error) {
      toast?.error(result.error);
    } else {
      toast?.success("회원가입이 완료되었습니다.");
      router.push("/");
    }
  };

  useEffect(() => {
    const toastInstance = new Toast();
    setToast(toastInstance);
  }, []);

  useEffect(() => {
    if (toast) {
      toast?.info("추가 정보 등록 후 가입이 가능합니다.");
    }
  }, [toast]);

  return (
    <>
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelBox
          title='닉네임'
          htmlFor='nickname'
        >
          <Input
            id='nickname'
            name='nickname'
            type='text'
            placeholder='닉네임을 입력해 주세요'
            register={register}
            rules={SIGNUP_VALIDATION.nickname}
            errors={errors}
          />
        </LabelBox>
        <Button
          className={styles.button}
          styleType='primary'
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "가입중..." : "가입하기"}
        </Button>
      </form>
    </>
  );
}
