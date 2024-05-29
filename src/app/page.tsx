import Statistics from "@/components/Card/Statistics/Statistics";

export default function Home() {
  const props = {
    rating: 4.5,
    favoriteCount: 4,
    reviewCount: 4,
  };
  return (
    <div>
      <Statistics
        title='별점 평균'
        rating={4.9}
        categoryMetric={props}
      />
    </div>
  );
}
