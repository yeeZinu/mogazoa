import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Compare } from "@/components/Chip/Compare/Compare";
import styles from "./CompareInput.module.scss";
import { dummyProducts, Product } from "./compareProductMock";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";

type ProductSelectorProps = {
  onCompare: (product1: Product | null, product2: Product | null) => void;
};

const ProductSelector: React.FC<ProductSelectorProps> = ({ onCompare }) => {
  const [product1, setProduct1] = useState<string>("");
  const [product2, setProduct2] = useState<string>("");
  const [suggestions1, setSuggestions1] = useState<Product[]>([]);
  const [suggestions2, setSuggestions2] = useState<Product[]>([]);
  const [selectedProduct1, setSelectedProduct1] = useState<Product | null>(null);
  const [selectedProduct2, setSelectedProduct2] = useState<Product | null>(null);

  useEffect(() => {
    const savedProduct1 = getFromLocalStorage("selectedProduct1");
    const savedProduct2 = getFromLocalStorage("selectedProduct2");
    if (savedProduct1) setSelectedProduct1(savedProduct1);
    if (savedProduct2) setSelectedProduct2(savedProduct2);
  }, []);

  const handleSearch = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<Product[]>>) => {
    // if (query.length > 0) {
    //   try {
    //     const response = await fetch(`/4-20/products?search=${query}`);
    //     const data = await response.json();
    //     const products: Product[] = data.list;
    //     setSuggestions(products);
    //   } catch (error) {
    //     console.error("Failed to fetch suggestions:", error);
    //   }
    // } else {
    //   setSuggestions([]);
    // }

    // Use dummy data for now
    if (query.length > 0) {
      const filteredProducts = dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (
    product: Product,
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Product[]>>,
    setProduct: React.Dispatch<React.SetStateAction<string>>,
    localStorageKey: string,
  ) => {
    setSelectedProduct(product);
    setSuggestions([]);
    setProduct("");
    saveToLocalStorage(localStorageKey, product);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    product: Product,
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Product[]>>,
    setProduct: React.Dispatch<React.SetStateAction<string>>,
    localStorageKey: string,
  ) => {
    if (event.key === "Enter") {
      handleSelect(product, setSelectedProduct, setSuggestions, setProduct, localStorageKey);
    }
  };

  const handleCompareClick = () => {
    onCompare(selectedProduct1, selectedProduct2);
  };

  return (
    <div className={styles.content}>
      <div>
        <div className={styles.text}>상품 1: </div>
        <div className={styles.inputBox}>
          <div className={styles.compareChip}>
            {selectedProduct1 && (
              <Compare
                value={selectedProduct1.name}
                onRemove={() => {
                  setSelectedProduct1(null);
                  saveToLocalStorage("selectedProduct1", null);
                }}
                color
              />
            )}
          </div>
          <input
            className={styles.input}
            type='text'
            value={product1}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setProduct1(e.target.value);
              handleSearch(e.target.value, setSuggestions1);
            }}
          />
          {suggestions1.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions1.map((item) => (
                <div
                  key={item.id}
                  className={styles.listItem}
                  onClick={() =>
                    handleSelect(item, setSelectedProduct1, setSuggestions1, setProduct1, "selectedProduct1")
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, item, setSelectedProduct1, setSuggestions1, setProduct1, "selectedProduct1")
                  }
                  tabIndex={0}
                  role='button'
                >
                  {item.name}
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <div className={styles.text}>상품 2: </div>
        <div className={styles.inputBox}>
          <div className={styles.compareChip}>
            {selectedProduct2 && (
              <Compare
                value={selectedProduct2.name}
                onRemove={() => {
                  setSelectedProduct2(null);
                  saveToLocalStorage("selectedProduct2", null);
                }}
                color={false}
              />
            )}
          </div>
          <input
            className={styles.input}
            type='text'
            value={product2}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setProduct2(e.target.value);
              handleSearch(e.target.value, setSuggestions2);
            }}
          />
          {suggestions2.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions2.map((item) => (
                <div
                  key={item.id}
                  className={styles.listItem}
                  onClick={() =>
                    handleSelect(item, setSelectedProduct2, setSuggestions2, setProduct2, "selectedProduct2")
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, item, setSelectedProduct2, setSuggestions2, setProduct2, "selectedProduct2")
                  }
                  tabIndex={0}
                  role='button'
                >
                  {item.name}
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        type='button'
        onClick={handleCompareClick}
        className={styles.button}
      >
        비교하기
      </button>
    </div>
  );
};

export default ProductSelector;
