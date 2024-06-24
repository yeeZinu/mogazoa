"use client";

import Image from "next/image";
import { Session } from "next-auth";
import React, { useState } from "react";
import WithModal from "@/app/product/components/with-modal/WithModal";
import { toggleItem } from "@/app/product/utils/apis";
import { BUTTON_LIST, MODAL_LIST, SHARE_OPTION_LIST } from "@/app/product/utils/constant";
import Button from "@/components/Button/Button";
import CategoryChip from "@/components/Chip/Category-chip/CategoryChip";
import { ProductDetailType } from "@/types/global";
import { SAVE_ICON, UNSAVE_ICON } from "@/utils/constant";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  session: Session | null;
  productDetail: ProductDetailType;
};

export default function ProductCard({ productDetail, session }: ProductCardProps) {
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    reviewModal: false,
    compareModal: false,
    loginModal: false,
    editModal: false,
  });

  const { id, name, description, image, category, isFavorite: favorite, writerId } = productDetail;
  const [isFavorite, setIsFavorite] = useState(favorite);
  const userId = session?.user?.id;
  const accessToken = session?.accessToken;
  const isWriter = userId === writerId;

  const openModal = (modalName: string) => setModalState((prev) => ({ ...prev, [modalName]: true }));
  const closeModal = (modalName: string) => setModalState((prev) => ({ ...prev, [modalName]: false }));

  const handleFavorite = async () => {
    if (!userId) {
      openModal("loginModal");
      return;
    }
    setIsFavorite(await toggleItem(id, isFavorite, accessToken, "products"));
  };

  return (
    <section className={styles.layout}>
      <Image
        className={styles.image}
        src={image}
        alt='product'
        width={320}
        height={320}
      />
      <article className={styles.articleBox}>
        <CategoryChip>{category.name}</CategoryChip>
        <div className={styles.titleBox}>
          <div className={styles.nameBox}>
            <h1 className={styles.name}>{name}</h1>
            <Image
              className={styles.favoriteImage}
              src={isFavorite ? SAVE_ICON : UNSAVE_ICON}
              alt='favorite'
              width={28}
              height={28}
              onClick={handleFavorite}
            />
          </div>
          <div className={styles.shareBox}>
            {SHARE_OPTION_LIST.map((share) => (
              <Image
                className={styles.shareImage}
                key={share.name}
                src={share.image}
                alt='share'
                width={35}
                height={35}
                onClick={share.onClick}
              />
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonLayout}>
          {BUTTON_LIST.map(
            (button) =>
              (button.isVisible || isWriter) && (
                <Button
                  key={button.title}
                  className={styles.button}
                  styleType={button.styleType}
                  onClick={() => openModal(button.modalName)}
                >
                  {button.title}
                </Button>
              ),
          )}
        </div>
      </article>
      {MODAL_LIST.map(
        (modal) =>
          modalState[modal.name] && (
            <WithModal
              key={modal.name}
              onClose={() => closeModal(modal.name)}
            >
              {React.createElement(modal.component, { productDetail, session, onClose: () => closeModal(modal.name) })}
            </WithModal>
          ),
      )}
    </section>
  );
}
