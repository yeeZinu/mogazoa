import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { setSessionStorage } from "@/utils/storage";
import styles from "./LoginModal.module.scss";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLoginButtonClick = () => {
    setSessionStorage("prevPath", pathname);
    router.push("/signin");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>알림 </h2>
      <p className={styles.description}>로그인 후 이용하실 수 있습니다.</p>
      <Button
        styleType='primary'
        onClick={handleLoginButtonClick}
      >
        Login하러가기
      </Button>
    </div>
  );
}
