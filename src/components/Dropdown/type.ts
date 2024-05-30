import { DROPDOWN } from "./constants";

export type ItemType = {
  value: number | string;
  option: string;
};

export type VariantType = (typeof DROPDOWN)[keyof typeof DROPDOWN];
