import { getServerSession } from "next-auth";
import ProductCard from "@/app/product/components/card/ProductCard";
import ReviewCardList from "@/app/product/components/card/ReviewCardList";
import Shopping from "@/app/product/components/shopping/Shopping";
import Statistics, { StatisticsProps } from "@/components/Card/Statistics/Statistics";
import authOptions from "@/lib/auth";
import { ProductDetailType, ReviewType } from "@/types/global";
import HttpClient from "@/utils/httpClient";
import styles from "./page.module.scss";

type StatisticsListType = Omit<StatisticsProps, "compare">;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  const productId = params.slug;
  const httpClient = new HttpClient(process.env.BASE_URL || "");

  const productDetail: ProductDetailType = await httpClient.get(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-cache",
  });

  const { list: reviewList }: { list: ReviewType[] } = await httpClient.get(`/products/${productId}/reviews`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-cache",
  });

  const hasReviewList = reviewList.length !== 0;
  const { rating, reviewCount, favoriteCount, categoryMetric } = productDetail;
  const statisticsList: StatisticsListType[] = [
    { title: "별점 평균", rating },
    { title: "리뷰", reviewCount },
    { title: "찜", favoriteCount },
  ];
  return (
    <div className={styles.layout}>
      <ProductCard
        productDetail={productDetail}
        session={session}
      />
      <h2 className={styles.title}>상품 통계</h2>

      <div className={styles.metricBox}>
        {statisticsList.map((statistics) => (
          <div key={statistics.title}>
            <Statistics
              title={statistics.title}
              rating={statistics.rating}
              reviewCount={statistics.reviewCount}
              favoriteCount={statistics.favoriteCount}
              compare={categoryMetric}
            />
          </div>
        ))}
      </div>
      <h2 className={styles.title}>상품 리뷰</h2>
      {hasReviewList ? (
        <ReviewCardList
          reviewList={reviewList}
          session={session}
        />
      ) : (
        <p>첫 리뷰의 주인공이 되어보세요!</p>
      )}
      <h2 className={styles.title}>쇼핑하러가기</h2>
      <Shopping name={productDetail.name} />
    </div>
  );
}
