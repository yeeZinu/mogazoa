import cn from "@/utils/classNames";
import styles from "./CategoryList.module.scss";

type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

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
        <li key={id}>
          <div
            role='button'
            className={cn(styles.item, selected === name && styles.selected)}
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
