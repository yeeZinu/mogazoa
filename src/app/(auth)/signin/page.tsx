import { SignInForm } from "./_components/SignInForm";
import styles from "./SignInPage.module.scss";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}
