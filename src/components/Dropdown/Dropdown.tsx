"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import cn from "@/utils/classNames";
import { DROP_DOWN_ICON } from "@/utils/constant";
import styles from "./Dropdown.module.scss";

type ItemType = {
  id: number;
  option: string;
};

type DropdownProps = {
  items: ItemType[];
  control: Control;
  name: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  rules?: { required: string };
};

export default function Dropdown({ items, control, name, placeholder, rules }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
    },
    defaultValue: "",
  });

  const selectedItem = items.find((item) => item.id === value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: ItemType) => {
    onChange(item.id);
    setIsOpen(false);
  };

  const handleBlur = () => {
    onBlur();
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.dropdownBox, isOpen && styles.focused, value && styles.selected, error && styles.error)}
        onClick={handleToggle}
        onKeyDown={handleToggle}
        onBlur={handleBlur}
        role='button'
        tabIndex={0}
      >
        {selectedItem?.option || placeholder}
        <Image
          src={DROP_DOWN_ICON}
          alt='드롭다운 아이콘'
          width={22}
          height={22}
          className={`${isOpen ? styles.iconUp : styles.iconDown}`}
        />
      </div>
      {isOpen && (
        <ul
          className={styles.dropdownList}
          role='listbox'
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={styles.dropdownItem}
              role='option'
              aria-selected={value === item.id}
              tabIndex={item.id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleItemClick(item)}
              onKeyDown={() => handleItemClick(item)}
            >
              {item.option}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
}
