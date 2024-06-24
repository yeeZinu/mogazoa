import cn from "@/utils/classNames";
import styles from "./FilteringText.module.scss";

type FilteringTextProps = {
  category: string | null;
  keyword: string | null;
};

export default function FilteringText({ category, keyword }: FilteringTextProps) {
  let filteringText = "";

  if (keyword && category) {
    return (
      <h2 className={cn(styles.headerText)}>
        <span>{category} 카테고리의 </span>
        <span>{keyword}로 검색한 상품</span>
      </h2>
    );
  }
  if (keyword) {
    filteringText = `${keyword}로 검색한 상품`;
  } else if (category) {
    filteringText = `${category}의 모든 상품`;
  }
  return <h2 className={cn(styles.headerText)}>{filteringText}</h2>;
}
