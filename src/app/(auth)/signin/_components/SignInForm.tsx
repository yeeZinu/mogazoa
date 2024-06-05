import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import styles from "./SignInForm.module.scss";

export default function SignInForm() {
  const methods = useForm({ mode: "onBlur" });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return (
    <FormProvider {...methods}>
      <form
        className={styles.container}
        onSubmit={handleSubmit(() => {})}
      >
        <Input
          name='email'
          label='이메일'
          type='email'
          required='이메일은 필수 입력입니다.'
          pattern={{ value: emailRegex, message: "이메일 형식으로 작성해주세요." }}
        />
        <Input
          name='password'
          label='비밀번호'
          type='password'
          required='비밀번호는 필수 입력입니다.'
        />
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
