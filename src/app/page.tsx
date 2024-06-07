import { Main } from "@/_home/components/Main";
import { getCategories } from "@/app/_home/api/getCategories";
import { getProducts } from "@/app/_home/api/getProducts";
import { getRanking } from "@/app/_home/api/getRanking";
import styles from "./page.module.scss";

export default async function Home() {
  const categories = await getCategories();
  const ranking = await getRanking();
  const hotProducts = await getProducts("reviewCount");
  const ratingProducts = await getProducts("rating");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Main
          categories={categories}
          ranking={ranking}
          products={{ hotProducts, ratingProducts }}
        />
      </div>
    </div>
  );
}
