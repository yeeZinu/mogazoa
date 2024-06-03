import styles from "./AuthLayout.module.scss";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className={styles.container}>{children}</div>;
}
