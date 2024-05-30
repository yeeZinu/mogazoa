import ProductCategory from "@/app/home/ProductCategory/ProductCategory";
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
      <ProductCategory categories={categories} />
    </div>
  );
}
