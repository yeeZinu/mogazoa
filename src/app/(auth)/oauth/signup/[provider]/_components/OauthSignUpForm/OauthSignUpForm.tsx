import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LabelBox } from "@/app/(auth)/_components/LabelBox";
import { SIGNUP_VALIDATION } from "@/app/(auth)/constants";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import styles from "./OauthSignUpForm.module.scss";

type OauthSignUpFormProps = {
  provider: string;
  token?: string;
};

type OauthSignUpFormData = {
  nickname: string;
};

export default function OauthSignUpForm({ provider, token }: OauthSignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<OauthSignUpFormData>({ mode: "onBlur" });

  const onSubmit = async (data: OauthSignUpFormData) => {
    const result = await signIn("easySignup", {
      redirect: false,
      token,
      provider,
      nickname: data.nickname,
    });

    if (result?.error) {
      setError("nickname", { message: "error" });
    }
  };

  return (
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
        disabled={!isValid}
      >
        가입하기
      </Button>
    </form>
  );
}
