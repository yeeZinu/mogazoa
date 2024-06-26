import { Metadata } from "next";
import { OauthSignInBox } from "@/auth/_components/OauthSignInBox";
import { SignInForm } from "./_components/SignInForm";
import styles from "./SignInPage.module.scss";

export const metadata: Metadata = {
  title: "로그인 - Mogazoa",
};

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignInForm />
      <OauthSignInBox requestPage='signin' />
    </div>
  );
}
