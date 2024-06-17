import Image from "next/image";
import { HTMLAttributes } from "react";
import styles from "./OauthSignInButton.module.scss";

type OauthSignInButtonProps = {
  image: string;
  name: string;
  onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>;

export default function OauthSignInButton({ image, name, onClick }: OauthSignInButtonProps) {
  return (
    <button
      className={styles.container}
      type='button'
      aria-label={`${name} login`}
      onClick={onClick}
    >
      <Image
        className={styles.icon}
        src={image}
        width='28'
        height='28'
        alt={name}
      />
    </button>
  );
}
