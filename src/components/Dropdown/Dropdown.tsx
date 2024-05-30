"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import cn from "@/utils/classNames";
import { DROP_DOWN_ICON } from "@/utils/constant";
import styles from "./Dropdown.module.scss";
import { DropdownList } from "./DropdownList";
import type { ItemType, VariantType } from "@/components/Dropdown/type";

type DropdownProps = {
  items: ItemType[];
  control: Control;
  name: string;
  variant?: VariantType;
  placeholder: string;
  rules?: { required: string };
};

export default function Dropdown({ items, control, name, variant, placeholder, rules }: DropdownProps) {
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

  const selectedItem = items.find((item) => item.value === value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: ItemType) => {
    onChange(item.value);
    setIsOpen(false);
  };

  const handleBlur = () => {
    onBlur();
    setIsOpen(false);
  };

  return (
    <div className={cn(styles.container, `${styles[`${variant}`]}`)}>
      <div
        className={cn(
          styles.dropdownBox,
          isOpen && styles.focused,
          value && styles.selected,
          error && styles.error,
          `${styles[`${variant}`]}`,
        )}
        role='button'
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleToggle}
        onBlur={handleBlur}
      >
        {selectedItem?.option || placeholder}
        <Image
          src={DROP_DOWN_ICON}
          alt='화살표'
          width={22}
          height={22}
          className={`${isOpen ? styles.iconUp : styles.iconDown}`}
        />
      </div>
      {isOpen && (
        <DropdownList
          items={items}
          selected={value}
          onClick={handleItemClick}
        />
      )}

      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
}
