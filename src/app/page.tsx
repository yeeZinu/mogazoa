import Main from "@/app/_home/components/Main/Main";
import styles from "./page.module.scss";

async function getData() {
  const res = await fetch("https://mogazoa-api.vercel.app/20/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const categories = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Main categories={categories} />
      </div>
    </div>
  );
}
