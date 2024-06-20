import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./Withmodal.module.scss";

type WithModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function WithModal({ children, onClose }: WithModalProps) {
  return (
    <Modal onClose={onClose}>
      <section className={styles.modal}>{children}</section>
      <Image
        className={styles.close}
        src={CLOSE_ICON}
        alt='close'
        onClick={onClose}
        width={30}
        height={30}
      />
    </Modal>
  );
}
