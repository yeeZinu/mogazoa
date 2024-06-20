"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useKeydown from "@/hooks/useKeydown";
import usePreventScroll from "@/hooks/usePreventScroll";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("modal"));
  }, []);

  if (!element) return null;
  return ReactDOM.createPortal(children, element) as JSX.Element;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useKeydown("Escape", onClose);
  usePreventScroll();

  return (
    <ModalPortal>
      <section className={styles.container}>
        <div
          className={styles.box}
          ref={modalRef}
        >
          {children}
        </div>
      </section>
    </ModalPortal>
  );
}
