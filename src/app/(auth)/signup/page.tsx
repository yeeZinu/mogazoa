import { OauthSignInBox } from "@/auth/_components/OauthSignInBox";
import { SignUpForm } from "./_components/SignUpForm";
import styles from "./SignUpPage.module.scss";

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUpForm />
      <OauthSignInBox />
    </div>
  );
}
