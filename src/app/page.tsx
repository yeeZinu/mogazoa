import { Main } from "@/_home/components/Main";
import HttpClient from "@/utils/httpClient";
import styles from "./page.module.scss";
import type { UserRankingType, ProductsResponseType, CategoryType } from "@/types/global";

export default async function Home() {
  const baseUrl = process.env.BASE_URL ?? "";
  const httpClient = new HttpClient(baseUrl);

  const categories = await httpClient.get<CategoryType[]>("/categories");
  const ranking = await httpClient.get<UserRankingType[]>("/users/ranking", {
    next: { revalidate: 3600 },
  });
  const hotProducts = await httpClient.get<ProductsResponseType>("/products?order=reviewCount", {
    next: { revalidate: 300 },
  });
  const ratingProducts = await httpClient.get<ProductsResponseType>("/products?order=rating", {
    next: { revalidate: 300 },
  });

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
