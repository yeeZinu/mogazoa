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
        title='리뷰'
        rating={4.5}
        favoriteCount={4}
        reviewCount={6}
        compare={props}
      />
    </div>
  );
}
