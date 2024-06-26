import { Metadata } from "next";
import { OauthSignInBox } from "@/auth/_components/OauthSignInBox";
import { SignUpForm } from "./_components/SignUpForm";
import styles from "./SignUpPage.module.scss";

export const metadata: Metadata = {
  title: "회원가입 - Mogazoa",
};

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUpForm />
      <OauthSignInBox requestPage='signup' />
    </div>
  );
}
