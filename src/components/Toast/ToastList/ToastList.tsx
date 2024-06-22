import { ToastBox } from "@/components/Toast/ToastBox";
import { Message } from "@/components/Toast/type";
import styles from "./ToastList.module.scss";

type ToastListProps = {
  messages: Message[];
  closeToast: (id: string) => void;
};

export default function ToastList({ messages, closeToast }: ToastListProps) {
  return (
    <div className={styles.container}>
      {messages.map(({ message, id, type }: Message) => (
        <ToastBox
          key={id}
          id={id}
          message={message}
          type={type}
          onClose={closeToast}
        />
      ))}
    </div>
  );
}
