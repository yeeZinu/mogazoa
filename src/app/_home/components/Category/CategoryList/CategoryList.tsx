import cn from "@/utils/classNames";
import styles from "./CategoryList.module.scss";
import type { CategoryType } from "@/types/global";

type CategoryListProps = {
  selected: null | string;
  onClick: (id: number, name: string) => void;
  categoryList: CategoryType[];
};

export default function CategoryList({ selected, onClick, categoryList }: CategoryListProps) {
  return (
    <ul
      role='menu'
      className={cn(styles.list)}
    >
      {categoryList.map(({ id, name }) => (
        <li
          key={id}
          role='menuitem'
        >
          <div
            role='button'
            className={cn(styles.item, selected === id.toString() && styles.selected)}
            onClick={() => onClick(id, name)}
            onKeyDown={() => onClick(id, name)}
            tabIndex={0}
          >
            {name}
          </div>
        </li>
      ))}
    </ul>
  );
}
