import styles from "./layout.module.scss";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <section className={styles.container}>{children}</section>;
}
