import { ItemType } from "@/components/Dropdown/type";

export const findOptionByValue = (Items: ItemType[], valueToFind: string | null) => {
  const result = Items.find(({ value }) => value === valueToFind);
  return result ? result.option : Items[0].option;
};
