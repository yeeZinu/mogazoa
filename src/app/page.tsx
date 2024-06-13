import { Main } from "@/_home/components/Main";
import { getData } from "@/app/_home/api/getData";

import styles from "./page.module.scss";

export default async function Home() {
  const categories = await getData("/categories");
  const ranking = await getData("/users/ranking");
  const hotProducts = await getData(`/products?order=reviewCount`);
  const ratingProducts = await getData(`/products?order=rating`);

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
