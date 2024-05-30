import cn from "@/utils/classNames";
import styles from "./DropdownList.module.scss";
import type { ItemType } from "@/components/Dropdown/type";

type DropdownListProps = {
  items: ItemType[];
  selected: number | string;
  onClick: (item: ItemType) => void;
};

export default function DropdownList({ items, selected, onClick }: DropdownListProps) {
  return (
    <ul
      className={cn(styles.dropdownList)}
      role='listbox'
    >
      {items.map((item) => (
        <li
          key={item.value}
          className={styles.dropdownItem}
          role='option'
          aria-selected={selected === item.value}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onClick(item)}
          onKeyDown={() => onClick(item)}
        >
          {item.option}
        </li>
      ))}
    </ul>
  );
}
