import Link from "next/link";
import { useEffect, useState } from "react";
import { STORAGE_PRODUCT_A, STORAGE_PRODUCT_B } from "@/app/compare/constant/constant";
import { getFromLocalStorage, saveToLocalStorage } from "@/app/compare/input/localStorage";
import ProductInput from "@/app/product/components/input/ProductInput";
import WithModal from "@/app/product/components/with-modal/WithModal";
import getButtonMessage from "@/app/product/utils/getButtonMessage";
import { ModalProps } from "@/app/product/utils/types";
import Button from "@/components/Button/Button";
import { ProductDetailType } from "@/types/global";
import styles from "./CompareModal.module.scss";
import LoginModal from "./LoginModal";

export default function CompareModal({ productDetail, session, onClose }: ModalProps) {
  const accessToken = session?.accessToken;

  const [productState, setProductState] = useState<{ [key: string]: ProductDetailType | null }>({
    [STORAGE_PRODUCT_A]: null,
    [STORAGE_PRODUCT_B]: null,
  });

  const [slotState, setSlotState] = useState<"empty" | "change" | "ok">("empty");

  const isChange = slotState === "change";

  useEffect(() => {
    const registerProduct = () => {
      let hasProduct = false;
      const product1 = getFromLocalStorage(STORAGE_PRODUCT_A);
      if (!product1) {
        setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_A]: productDetail }));
        saveToLocalStorage(STORAGE_PRODUCT_A, productDetail);
        return;
      }
      if (product1.name === productDetail.name) hasProduct = true;
      setProductState((prev) => ({ ...prev, [STORAGE_PRODUCT_A]: product1 }));

      const product2 = getFromLocalStorage(STORAGE_PRODUCT_B);
      if (hasProduct && !product2) {
        setSlotState("empty");
        return;
      }
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

  if (!accessToken) {
    return (
      <WithModal onClose={onClose}>
        <LoginModal />
      </WithModal>
    );
  }

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
        styleType='primary'
        disabled={slotState !== "ok"}
      >
        <Link href='/compare'>{getButtonMessage(slotState)}</Link>
      </Button>
    </div>
  );
}
