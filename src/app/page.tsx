import { Main } from "@/_home/components/Main";
import { ranking } from "@/app/_home/mock";
import styles from "./page.module.scss";

// TODO: hook으로 분리
async function getData() {
  const res = await fetch("https://mogazoa-api.vercel.app/20/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// TODO: data fetch (ranking)

export default async function Home() {
  const categories = await getData();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Main
          categories={categories}
          ranking={ranking}
        />
      </div>
    </div>
  );
}
