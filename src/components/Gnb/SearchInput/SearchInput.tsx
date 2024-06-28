"use client";

import debounce from "lodash.debounce";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MutableRefObject, useEffect, useState, useRef, useCallback, useMemo, KeyboardEvent } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { QUERY } from "@/_home/constants";
import { useSuggestions } from "@/components/Gnb/SearchInput/hooks/useSuggestions";
import useOutsideClick from "@/hooks/useOutsideClick";
import cn from "@/utils/classNames";
import { SEARCH_ICON } from "@/utils/constant";
import { createQueryString } from "@/utils/createQueryString";
import styles from "./SearchInput.module.scss";
import type { ProductType } from "@/types/global";

type SearchInputProps = {
  isOpen: boolean;
  inputRef: MutableRefObject<() => void>;
  onClick: () => void;
};

type KeywordType = {
  keyword: string;
};

export default function SearchInput({ isOpen, inputRef, onClick }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const param = searchParams.get(QUERY.KEYWORD);

  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLFormElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, reset, control, setValue } = useForm<KeywordType>();
  const watched = useWatch({ control, name: "keyword" });

  const { data: list, refetch } = useSuggestions(watched);

  const debouncedRefetch = useMemo(() => debounce(refetch, 300), [refetch]);

  const onSubmit: SubmitHandler<KeywordType> = ({ keyword }) => {
    router.push(`/?${createQueryString("keyword", keyword, searchParams)}`);
  };

  const resetSuggestions = () => {
    setSuggestions([]);
  };

  const handleIconClick = () => {
    onClick();
    resetSuggestions();
  };

  const handleSuggestionClick = useCallback(
    (suggestion: ProductType) => {
      router.push(`/?${createQueryString("keyword", suggestion.name, searchParams)}`);
      setValue("keyword", suggestion.name);
      resetSuggestions();
    },
    [router, searchParams, setValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLLIElement>) => {
      if (event.nativeEvent.isComposing) return;
      if (event.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)));
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        if (focusedIndex === 0) {
          searchInputRef.current?.focus();
          setFocusedIndex(null);
        } else {
          setFocusedIndex((prev) => (prev === null ? null : Math.max(prev - 1, 0)));
        }
        event.preventDefault();
      } else if (event.key === "Enter" && focusedIndex !== null) {
        handleSuggestionClick(suggestions[focusedIndex]);
        setFocusedIndex(null);
        event.preventDefault();
      }
    },
    [suggestions, focusedIndex, handleSuggestionClick],
  );

  useEffect(() => {
    reset();
  }, [pathName, reset]);

  useEffect(() => {
    if (list) {
      setSuggestions(list);
    }
  }, [list]);

  useEffect(() => {
    if (watched && param !== watched) {
      debouncedRefetch();
    } else {
      resetSuggestions();
    }
  }, [watched, debouncedRefetch, param]);

  useEffect(() => {
    if (focusedIndex !== null) {
      const focusedElement = listRef.current?.children[focusedIndex] as HTMLElement;
      focusedElement?.focus();
    }
  }, [focusedIndex]);

  useOutsideClick(containerRef, resetSuggestions);

  // eslint-disable-next-line no-param-reassign
  inputRef.current = reset;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
      ref={containerRef}
    >
      <Image
        className={styles.icon}
        src={SEARCH_ICON}
        width={24}
        height={24}
        alt='돋보기'
        onClick={handleIconClick}
      />

      <input
        className={cn(
          styles.input,
          !isOpen && styles.closed,
          suggestions.length > 0 && watched !== suggestions[0].name && styles.suggestions,
        )}
        placeholder='상품 이름을 검색해 보세요'
        autoComplete='off'
        {...register("keyword", { required: true })}
        onKeyDown={handleKeyDown}
        onClick={() => setFocusedIndex(null)}
        ref={(e) => {
          register("keyword").ref(e);
          searchInputRef.current = e;
        }}
      />
      {suggestions.length > 0 && watched !== suggestions[0].name && (
        <ul
          className={styles.suggestionList}
          role='listbox'
          ref={listRef}
          tabIndex={0}
        >
          {suggestions.map((product: ProductType, index) => (
            <li
              key={product.id}
              className={styles.suggestion}
              role='option'
              aria-selected={index === focusedIndex}
              onClick={() => handleSuggestionClick(product)}
              onKeyDown={(event) => {
                handleKeyDown(event);
              }}
              tabIndex={-1}
            >
              <Image
                src={SEARCH_ICON}
                width={20}
                height={20}
                alt='돋보기'
              />
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
