"use client";

import Image from "next/image";
import React, { useState } from "react";
import { LOADING_LARGE_IMAGE } from "@/utils/constant";
import styles from "./compare.module.scss";
import ProductSelector from "./input/CompareInput";
import CompareTable from "./table/CompareTable";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
};

function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<{
    product1: Product | null;
    product2: Product | null;
  }>({ product1: null, product2: null });

  const handleCompare = (product1: Product | null, product2: Product | null) => {
    setSelectedProducts({ product1, product2 });
  };

  return (
    <div className={styles.background}>
      <ProductSelector onCompare={handleCompare} />
      {selectedProducts.product1 && selectedProducts.product2 ? (
        <CompareTable
          product1={selectedProducts.product1}
          product2={selectedProducts.product2}
        />
      ) : (
        <div className={styles.loading}>
          <Image
            src={LOADING_LARGE_IMAGE}
            alt='loading'
            width={87}
            height={84}
          />
        </div>
      )}
    </div>
  );
}

export default ComparePage;
