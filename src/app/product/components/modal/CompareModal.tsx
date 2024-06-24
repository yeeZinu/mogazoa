import Link from "next/link";
import { useEffect, useState } from "react";
import { STORAGE_PRODUCT_A, STORAGE_PRODUCT_B } from "@/app/compare/constant/constant";
import { getFromLocalStorage, saveToLocalStorage } from "@/app/compare/input/localStorage";
import ProductInput from "@/app/product/components/input/ProductInput";
import getButtonMessage from "@/app/product/utils/getButtonMessage";
import Button from "@/components/Button/Button";
import { ProductDetailType } from "@/types/global";
import cn from "@/utils/classNames";
import styles from "./CompareModal.module.scss";

export default function CompareModal({ productDetail }: { productDetail: ProductDetailType }) {
  const [productState, setProductState] = useState<{ [key: string]: ProductDetailType | null }>({
    [STORAGE_PRODUCT_A]: null,
    [STORAGE_PRODUCT_B]: null,
  });

  const [slotState, setSlotState] = useState<"empty" | "change" | "ok">("empty");

  const isChange = slotState === "change";

  useEffect(() => {
    const registerProduct = () => {
      const product1 = getFromLocalStorage(STORAGE_PRODUCT_A);
      if (!product1) {
        setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_A]: productDetail }));
        saveToLocalStorage(STORAGE_PRODUCT_A, productDetail);
        return;
      }
      setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_A]: product1 }));

      const product2 = getFromLocalStorage(STORAGE_PRODUCT_B);
      if (!product2) {
        setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_B]: productDetail }));
        saveToLocalStorage(STORAGE_PRODUCT_B, productDetail);
        setSlotState("ok");
        return;
      }
      setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_B]: product2 }));
      if (product1.name === productDetail.name || product2.name === productDetail.name) {
        setSlotState("ok");
        return;
      }
      setSlotState("change");
    };
    registerProduct();
  }, [productDetail]);

  const handleProductChange = (event: React.MouseEvent<HTMLImageElement>) => {
    const { id } = event.currentTarget;
    setProductState((prev) => ({ ...prev, [id]: productDetail }));
    saveToLocalStorage(id, productDetail);
    setSlotState("ok");
  };

  return (
    <div className={styles.container}>
      <div className={styles.productInputBox}>
        <p>상품1</p>
        <ProductInput
          id={STORAGE_PRODUCT_A}
          product={productState[STORAGE_PRODUCT_A]?.name}
          isChange={isChange}
          onClick={handleProductChange}
        />
        <p>상품2</p>
        <ProductInput
          id={STORAGE_PRODUCT_B}
          product={productState[STORAGE_PRODUCT_B]?.name}
          second
          isChange={isChange}
          onClick={handleProductChange}
        />
      </div>
      <Button
        className={cn(styles.button, slotState !== "ok" && styles.redBorder)}
        styleType='primary'
        disabled={slotState !== "ok"}
      >
        <Link href='/compare'>{getButtonMessage(slotState)}</Link>
      </Button>
    </div>
  );
}
